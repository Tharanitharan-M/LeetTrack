import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Neetcode 150 problems data
const problems = [
  {
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/two-sum',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Strings',
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    companies: ['Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'Trees',
    companies: ['Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal',
    createdAt: new Date().toISOString(),
  },
  {
    title: '3Sum',
    difficulty: 'Medium',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/3sum',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'LRU Cache',
    difficulty: 'Medium',
    topic: 'Design',
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/lru-cache',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topic: 'Arrays',
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/regular-expression-matching',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    topic: 'Linked Lists',
    companies: ['Google', 'Amazon', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists',
    createdAt: new Date().toISOString(),
  }
];

async function seedProblems() {
  try {
    console.log('Starting to seed problems...');
    const problemsCollection = collection(db, 'problems');
    
    for (const problem of problems) {
      try {
        const docRef = await addDoc(problemsCollection, problem);
        console.log(`Added problem: ${problem.title} with ID: ${docRef.id}`);
      } catch (error) {
        console.error(`Error adding problem ${problem.title}:`, error);
      }
    }
    
    console.log('Successfully seeded problems!');
  } catch (error) {
    console.error('Error seeding problems:', error);
  }
}

seedProblems(); 