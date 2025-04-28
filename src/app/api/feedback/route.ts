// /app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

// Firebase config from env
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once
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
      console.warn('[API/Feedback] Missing required fields:', { code, problemTitle, submissionId });
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      console.error('[API/Feedback] Gemini API key not set.');
      return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
    }

    // Build the prompt
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
  ]
}

Please include:

- feedbackText: A friendly, constructive summary of what the user did well and what could be improved.
- optimizedCode: Provide an optimized version of the code *only if a meaningful improvement is possible*. Otherwise, return the original code.
- patternDetected: Identify the main DSA pattern (e.g., Two Pointers, Sliding Window, Hash Map).
- companiesFound: List real companies that have asked this problem based on your knowledge or real web sources. If unknown, return an empty array [].
- patternThinkingSteps: A list of thinking steps for solving this problem. For each step, provide:
    - title: Summarize the core action in a few words (e.g., "Consider Brute Force", "Use Hash Map for Lookup").
    - description: 1-3 sentences of detailed explanation. No Markdown formatting, no numbering, just title and paragraph.
    - Do not use Markdown formatting (no **, no #, no lists). No numbering needed. Just title and paragraph.
    - Each step should be actionable and clear for a student.

Additional instructions:
- Use a friendly, supportive tone (no harsh criticism).
- Assume the primary coding language is Python unless otherwise stated.
- Ensure the output JSON is syntactically correct and parsable without errors.

Submission:
- Code: <user's code>
- Language: <language>
- Approach: <user's explanation of approach>
- Problem Title: <problem title>
`;

    console.log('[API/Feedback] Preparing Gemini API request...');

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' }
      ]
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    let geminiRes;
    try {
      geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeout);
      console.error('[API/Feedback] Gemini API fetch error:', err);
      if ((err as any).name === 'AbortError') {
        return NextResponse.json({ error: 'Gemini API request timed out.', details: String(err) }, { status: 504 });
      }
      return NextResponse.json({ error: 'Gemini API fetch failed', details: String(err) }, { status: 500 });
    }
    clearTimeout(timeout);

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error('[API/Feedback] Gemini API error:', errorText);
      return NextResponse.json({ error: 'Gemini API error', details: errorText }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    console.log('[API/Feedback] Gemini API raw response:', JSON.stringify(geminiData));

    // Extract text content
    const textResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let feedback;
    try {
      feedback = JSON.parse(textResponse);
    } catch (e) {
      const match = textResponse.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          feedback = JSON.parse(match[0]);
        } catch (e2) {
          console.error('[API/Feedback] Failed to parse Gemini response as JSON:', e2, textResponse);
          return NextResponse.json({ error: 'Failed to parse Gemini response as JSON', raw: textResponse, details: String(e2) }, { status: 500 });
        }
      } else {
        console.error('[API/Feedback] No valid JSON found in Gemini response:', textResponse);
        return NextResponse.json({ error: 'No valid JSON in Gemini response', raw: textResponse }, { status: 500 });
      }
    }

    // Save to Firestore
    try {
      await setDoc(doc(db, 'feedback', submissionId), {
        ...feedback,
        submissionId,
        createdAt: Date.now(),
      });
      console.log('[API/Feedback] Feedback successfully written to Firestore.');
      // Mark submission as solved
      await setDoc(doc(db, 'submissions', submissionId), { status: 'Solved' }, { merge: true });
      console.log('[API/Feedback] Submission marked as Solved.');

      // Update user streak
      const submissionDoc = await getDoc(doc(db, 'submissions', submissionId));
      const userId = submissionDoc.data()?.userId;
      if (userId) {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        const today = new Date();
        const todayStr = today.toISOString().slice(0, 10);
        let newStreak = 1;
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const lastSolvedDate = userData.lastSolvedDate;
          if (lastSolvedDate) {
            const lastDate = new Date(lastSolvedDate);
            const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
              newStreak = (userData.streakCount || 0) + 1;
            } else if (diffDays === 0) {
              newStreak = userData.streakCount || 1;
            }
          }
        }
        await setDoc(userRef, { streakCount: newStreak, lastSolvedDate: todayStr }, { merge: true });
        console.log('[API/Feedback] User streak updated:', { userId, newStreak, todayStr });
      }
    } catch (firestoreErr) {
      console.error('[API/Feedback] Firestore write error:', firestoreErr);
      return NextResponse.json({ error: 'Failed to write feedback to Firestore', details: String(firestoreErr) }, { status: 500 });
    }

    return NextResponse.json(feedback);

  } catch (err) {
    console.error('[API/Feedback] Internal server error:', err);
    return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 });
  }
}