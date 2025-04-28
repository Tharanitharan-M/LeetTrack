// /app/api/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

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

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
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
      ]
    }
    
    Please include:
    
    - feedbackText: A friendly, constructive summary of what the user did well and what could be improved.
    - optimizedCode: Provide an optimized version of the code *only if a meaningful improvement is possible*. Otherwise, return the original code.
    - patternDetected: Identify the main DSA pattern (e.g., Two Pointers, Sliding Window, Hash Map).
    - companiesFound: List real companies that have asked this problem based on your knowledge or real web sources. If unknown, return an empty array [].
    - patternThinkingSteps:
        - Write it like a real interview mental checklist.
        - Short bullets or short thinking points.
        - No paragraphs, no blog-style explanations.
        - Focus on what the student would *notice*, *decide*, and *do* step-by-step when seeing the problem.
        - Capture quick decision-making ("Need to track presence? Use set.", "Need indices? Use hashmap.", "Want O(1) lookup?"), not detailed analysis.
        - Each step must have a short "title" and a 1-2 line "description" explaining the intuition.
        - No Markdown formatting. No numbering inside the text. Keep it natural and clean.
    
    Additional instructions:
    - Use a friendly, supportive tone (no harsh criticism).
    - Assume the primary coding language is Python unless otherwise stated.
    - Ensure the output JSON is syntactically correct and parsable without errors.
    
    Submission:
    - Code: ${code}
    - Language: ${language || 'Python'}
    - Approach: ${approach || 'No approach provided.'}
    - Problem Title: ${problemTitle}
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
        maxOutputTokens: 2048,
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
    let timeoutId: NodeJS.Timeout | undefined;
    try {
      timeoutId = setTimeout(() => {
        controller.abort();
      }, 30000);

      let geminiRes;
      try {
        geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } catch (err) {
        console.error('[API/Feedback] Gemini API fetch error:', err);
        return NextResponse.json({ error: 'Gemini API fetch failed', details: String(err) }, { status: 500 });
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }

      if (!geminiRes.ok) {
        let errorText = '';
        try {
          errorText = await geminiRes.text();
        } catch (e) {
          errorText = `Failed to read error response: ${e}`;
        }
        console.error('[API/Feedback] Gemini API error response:', errorText);
        return NextResponse.json({ error: 'Gemini API error', details: errorText }, { status: 500 });
      }

      let geminiData;
      try {
        geminiData = await geminiRes.json();
      } catch (e) {
        console.error('[API/Feedback] Failed to parse Gemini API JSON response:', e);
        return NextResponse.json({ error: 'Failed to parse Gemini API JSON response', details: String(e) }, { status: 500 });
      }

      const textResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!textResponse) {
        console.error('[API/Feedback] No text response from Gemini');
        return NextResponse.json({ error: 'No text response from Gemini' }, { status: 500 });
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
            console.error('[API/Feedback] Failed to parse Gemini JSON after regex fallback:', e2, 'Raw response:', textResponse);
            return NextResponse.json({ error: 'Failed to parse Gemini JSON after fallback', raw: textResponse, details: String(e2) }, { status: 500 });
          }
        } else {
          console.error('[API/Feedback] No valid JSON found in Gemini response:', textResponse);
          return NextResponse.json({ error: 'No valid JSON found', raw: textResponse }, { status: 500 });
        }
      }

      await setDoc(doc(db, 'feedback', submissionId), {
        ...feedback,
        submissionId,
        createdAt: Date.now(),
      });

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