import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { problems } from '../src/problems';
import { Problem } from '../src/types';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedProblems() {
  try {
    console.log('Starting to seed problems...');
    const problemsCollection = collection(db, 'problems');
    
    for (const problem of problems) {
      const { id, title, difficulty, topic, companies, acceptanceRate, leetcodeUrl } = problem;
      try {
        await addDoc(problemsCollection, {
          id,
          title,
          difficulty,
          topic,
          companies,
          acceptanceRate,
          leetcodeUrl,
        });
        console.log(`Added problem: ${title}`);
      } catch (error) {
        console.error(`Error adding problem ${title}:`, error);
      }
    }
    
    console.log('Successfully seeded problems!');
  } catch (error) {
    console.error('Error seeding problems:', error);
  }
}

seedProblems(); 