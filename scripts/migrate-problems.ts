import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { problems } from '../src/problems';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function migrateProblems() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const problemsCollection = collection(db, 'problems');

    console.log('Starting migration...');
    let successCount = 0;
    let errorCount = 0;

    // Add each problem to Firestore
    for (const problem of problems) {
      try {
        const problemData = {
          title: problem.title,
          difficulty: problem.difficulty,
          topic: problem.topic,
          companies: problem.companies || [],
          acceptanceRate: problem.acceptanceRate || '',
          leetcodeUrl: problem.leetcodeUrl,
          createdAt: new Date(),
          isDefault: true
        };

        await addDoc(problemsCollection, problemData);
        console.log(`✅ Added problem: ${problem.title}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error adding problem ${problem.title}:`, error);
        errorCount++;
      }
    }

    console.log('\nMigration Summary:');
    console.log(`✅ Successfully added: ${successCount} problems`);
    console.log(`❌ Failed to add: ${errorCount} problems`);
    console.log(`📊 Total problems processed: ${problems.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Fatal error during migration:', error);
    process.exit(1);
  }
}

// Check if environment variables are set
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.error('Error: Firebase configuration is missing. Please set the required environment variables:');
  console.error('NEXT_PUBLIC_FIREBASE_API_KEY');
  console.error('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
  console.error('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
  console.error('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
  console.error('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
  console.error('NEXT_PUBLIC_FIREBASE_APP_ID');
  process.exit(1);
}

migrateProblems(); 