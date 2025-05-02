'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, collection } from 'firebase/firestore';

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let submissionsCollection: ReturnType<typeof collection>;
let userProblemsCollection: ReturnType<typeof collection>;
let problemsCollection: ReturnType<typeof collection>;
let deletedProblemsCollection: ReturnType<typeof collection>;

// Only initialize Firebase on the client side
if (typeof window !== 'undefined') {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Initialize Firebase
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);

  // Initialize collection references
  submissionsCollection = collection(db, 'submissions');
  userProblemsCollection = collection(db, 'userProblems');
  problemsCollection = collection(db, 'problems');
  deletedProblemsCollection = collection(db, 'deletedProblems');
}

export { 
  app, 
  auth, 
  db,
  submissionsCollection,
  userProblemsCollection,
  problemsCollection,
  deletedProblemsCollection
}; 