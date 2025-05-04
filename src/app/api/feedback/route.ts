// /app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import OpenAI from 'openai';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_ENDPOINT = "https://models.github.ai/inference";
const MODEL = "openai/gpt-4.1";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[API/Feedback] Received body:', body);

    const { code, language, approach, problemTitle, submissionId } = body;

    if (!code || !problemTitle || !submissionId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!GITHUB_TOKEN) {
      return NextResponse.json({ error: 'GitHub token not set.' }, { status: 500 });
    }

    const prompt = `
You are an expert coding interview coach and AI reviewer.

Given the following code submission, provide structured feedback.

Your response MUST be returned in this exact JSON format:

{
  "feedbackText": "...",
  "optimizedCode": "...",
  "patternDetected": "...",
  "companiesFound": ["Amazon", "Google"],
  "patternThinkingSteps": [
    { "title": "...", "description": "..." },
    ...
  ],
  "aiThoughtProcess": {
    "codeAnalysis": "...",
    "approachEvaluation": "...",
    "timeComplexityAnalysis": "...",
    "alternativeApproaches": [
      {
        "approach": "...",
        "tradeoffs": "..."
      }
    ]
  }
}

Please include:

- feedbackText: A friendly, constructive summary of what the user did well and what could be improved.
- optimizedCode: Provide an optimized version of the code *only if a meaningful improvement is possible*. Otherwise, return the original code.
- patternDetected: Identify the main DSA pattern (e.g., Two Pointers, Sliding Window, Hash Map).
- companiesFound: List real companies that have asked this problem based on your knowledge or real web sources. If unknown, return an empty array [].
- patternThinkingSteps:
    - Imagine the student sees this problem for the first time in an interview.
    - Walk them through **how they should approach it from scratch to build intuition**.
    - Focus on first reactions, key observations, what choices they should think about (e.g., brute force vs better approach), and why they would pick certain data structures or techniques.
    - No long paragraphs. Use short, clear step titles and short descriptions that explain real-time thinking.
    - No academic section titles like "Understanding the Problem" or "Algorithm Design."
    - No Markdown formatting or numbering inside the text.
- aiThoughtProcess:
    - codeAnalysis: A detailed analysis of the submitted code, including its structure, implementation choices, and potential edge cases.
    - approachEvaluation: An evaluation of the user's thought process and problem-solving approach.
    - timeComplexityAnalysis: A thorough analysis of the time and space complexity, including why certain operations contribute to the overall complexity.
    - alternativeApproaches: List of alternative approaches with their tradeoffs, helping users understand different ways to solve the same problem.

Additional instructions:
- Use a friendly, supportive tone (no harsh criticism).
- Assume the primary coding language is Python unless otherwise stated.
- Ensure the output JSON is syntactically correct and parsable without errors.
- For the AI thought process, focus on explaining the reasoning behind the analysis and decisions.

Submission:
- Code: ${code}
- Language: ${language || 'Python'}
- Approach: ${approach || 'No approach provided.'}
- Problem Title: ${problemTitle}
`;

    console.log('[API/Feedback] Preparing OpenAI API request...');

    const client = new OpenAI({ 
      baseURL: GITHUB_ENDPOINT, 
      apiKey: GITHUB_TOKEN 
    });

    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout | undefined;
    try {
      timeoutId = setTimeout(() => {
        controller.abort();
      }, 30000);

      let openaiRes;
      try {
        openaiRes = await client.chat.completions.create({
          messages: [
            { role: "system", content: "You are an expert coding interview coach and AI reviewer." },
            { role: "user", content: prompt }
          ],
          temperature: 0.2,
          top_p: 1.0,
          model: MODEL
        });
      } catch (err) {
        console.error('[API/Feedback] OpenAI API error:', err);
        return NextResponse.json({ error: 'OpenAI API request failed', details: String(err) }, { status: 500 });
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }

      const textResponse = openaiRes.choices[0]?.message?.content || '';

      if (!textResponse) {
        console.error('[API/Feedback] No text response from OpenAI');
        return NextResponse.json({ error: 'No text response from OpenAI' }, { status: 500 });
      }

      let feedback;
      try {
        feedback = JSON.parse(textResponse);
      } catch (e) {
        // Attempt to extract JSON substring for fallback parsing
        const match = textResponse.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            feedback = JSON.parse(match[0]);
          } catch (e2) {
            console.error('[API/Feedback] Failed to parse OpenAI JSON after regex fallback:', e2, 'Raw response:', textResponse);
            return NextResponse.json({ error: 'Failed to parse OpenAI JSON after fallback', raw: textResponse, details: String(e2) }, { status: 500 });
          }
        } else {
          console.error('[API/Feedback] No valid JSON found in OpenAI response:', textResponse);
          return NextResponse.json({ error: 'No valid JSON found', raw: textResponse }, { status: 500 });
        }
      }

      await setDoc(doc(db, 'feedback', submissionId), {
        ...feedback,
        submissionId,
        createdAt: Date.now(),
      });

      // Get the submission to get the user ID
      const submissionDoc = await getDoc(doc(db, 'submissions', submissionId));
      if (!submissionDoc.exists()) {
        throw new Error('Submission not found');
      }
      const submission = submissionDoc.data();
      const userId = submission.userId;

      // Get the user document
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const user = userDoc.data();

      // Get the current date in UTC
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);

      // Get the last solved date in UTC
      const lastSolvedDate = user.lastSolvedDate ? new Date(user.lastSolvedDate) : null;
      if (lastSolvedDate) {
        lastSolvedDate.setUTCHours(0, 0, 0, 0);
      }

      // Calculate the difference in days
      const dayDiff = lastSolvedDate ? 
        Math.floor((currentDate.getTime() - lastSolvedDate.getTime()) / (1000 * 60 * 60 * 24)) : 
        0;

      // Update streak count and last solved date
      let newStreakCount = 1;
      if (lastSolvedDate) {
        if (dayDiff === 1) {
          // Consecutive day - increment streak
          newStreakCount = (user.streakCount || 0) + 1;
        } else if (dayDiff > 1) {
          // Missed a day - reset streak to 1
          newStreakCount = 1;
        } else {
          // Same day - keep current streak
          newStreakCount = user.streakCount || 1;
        }
      }

      // Update user document with new streak and last solved date
      await setDoc(doc(db, 'users', userId), {
        streakCount: newStreakCount,
        lastSolvedDate: currentDate.toISOString(),
        totalSolved: (user.totalSolved || 0) + 1,
      }, { merge: true });

      // Mark the submission as solved
      await setDoc(doc(db, 'submissions', submissionId), { status: 'Solved' }, { merge: true });

      console.log('[API/Feedback] Feedback successfully written to Firestore.');

      return NextResponse.json(feedback);

    } catch (err) {
      console.error('[API/Feedback] Internal server error:', err);
      return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 });
    }
  } catch (err) {
    console.error('[API/Feedback] Internal server error:', err);
    return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 });
  }
}