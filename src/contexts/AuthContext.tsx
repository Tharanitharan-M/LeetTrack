'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '@/types';

interface AuthContextType {
  user: (FirebaseUser & Partial<User>) | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(FirebaseUser & Partial<User>) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run auth state observer on the client side
    if (typeof window === 'undefined') return;

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          setUser(userDoc.data() as (FirebaseUser & Partial<User>));
        } else {
          // Create new user document
          const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            createdAt: new Date(),
            lastLoginAt: new Date(),
            streakCount: 0,
            lastSolvedDate: null,
            totalSolved: 0,
            inProgress: 0,
            unsolved: 0,
            completionPercentage: 0,
            topicProgress: {},
            preferences: {
              theme: 'system',
              difficulty: ['all'],
              topics: [],
              sortBy: 'title',
              sortOrder: 'asc'
            }
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          setUser(newUser as (FirebaseUser & Partial<User>));
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (typeof window === 'undefined') return;

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Check if user document exists
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (!userDoc.exists()) {
        // Create new user document
        const newUser: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          createdAt: new Date(),
          lastLoginAt: new Date(),
          streakCount: 0,
          lastSolvedDate: null,
          totalSolved: 0,
          inProgress: 0,
          unsolved: 0,
          completionPercentage: 0,
          topicProgress: {},
          preferences: {
            theme: 'system',
            difficulty: ['all'],
            topics: [],
            sortBy: 'title',
            sortOrder: 'asc'
          }
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
        setUser(newUser as (FirebaseUser & Partial<User>));
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    if (typeof window === 'undefined') return;

    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 