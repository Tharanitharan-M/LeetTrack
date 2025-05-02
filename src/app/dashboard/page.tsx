'use client';

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import ProgressStats from '@/components/dashboard/ProgressStats';
import ProblemsTable from '@/components/dashboard/ProblemsTable';
import FiltersBar from '@/components/dashboard/FiltersBar';
import { useState, useEffect } from 'react';
import { Problem } from '@/types';
import { db, problemsCollection, userProblemsCollection, deletedProblemsCollection } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default function DashboardPage() {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userProblems, setUserProblems] = useState<Problem[]>([]);
  const [deletedProblemIds, setDeletedProblemIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    difficulty: 'all',
    status: 'all',
    companies: [] as string[],
    topics: [] as string[],
    search: '',
  });

  useEffect(() => {
    const fetchProblems = async () => {
      if (!user) return;

      try {
        // Fetch default problems
        const problemsSnapshot = await getDocs(problemsCollection);
        const defaultProblems = problemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Problem[];

        // Fetch user's deleted problems
        const deletedProblemsQuery = query(
          deletedProblemsCollection,
          where('userId', '==', user.uid)
        );
        const deletedProblemsSnapshot = await getDocs(deletedProblemsQuery);
        const deletedIds = new Set(deletedProblemsSnapshot.docs.map(doc => doc.data().problemId));
        setDeletedProblemIds(deletedIds);

        // Filter out deleted problems
        const filteredProblems = defaultProblems.filter(p => !deletedIds.has(p.id));
        setProblems(filteredProblems);

        // Fetch user-specific problems
        const userProblemsQuery = query(userProblemsCollection, where('userId', '==', user.uid));
        const userProblemsSnapshot = await getDocs(userProblemsQuery);
        const userProblems = userProblemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Problem[];
        setUserProblems(userProblems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, [user]);

  const handleDeleteProblem = async (problemId: string) => {
    if (!user) return;
    
    try {
      // Check if it's a user-specific problem
      const userProblem = userProblems.find(p => p.id === problemId);
      if (userProblem) {
        // Delete from Firestore
        await deleteDoc(doc(db, 'userProblems', problemId));
        setUserProblems(userProblems.filter(p => p.id !== problemId));
      } else {
        // It's a default problem, mark it as deleted for this user
        await addDoc(deletedProblemsCollection, {
          userId: user.uid,
          problemId: problemId,
          deletedAt: new Date()
        });
        setDeletedProblemIds(new Set([...deletedProblemIds, problemId]));
        setProblems(problems.filter(p => p.id !== problemId));
      }
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  const handleAddProblem = async (newProblem: Omit<Problem, 'id'>) => {
    if (!user) return;

    try {
      // Add to Firestore
      const docRef = await addDoc(userProblemsCollection, {
        ...newProblem,
        userId: user.uid,
      });
      
      // Add to local state
      setUserProblems([...userProblems, { ...newProblem, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding problem:', error);
    }
  };

  // Combine default problems with user-specific problems
  const allProblems = [...problems, ...userProblems];

  return (
    <Layout showLogo={true}>
      <div className="pt-8 pb-4 bg-black/90 w-full text-center border-b border-gray-800 mb-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">Your DSA Dashboard</span>
          <span className="block text-blue-500 bg-clip-text">Progress & Practice</span>
        </h1>
        <div className="mt-2 text-lg text-gray-300">
          Welcome back, <span className="text-white font-bold">{user?.displayName}</span>!
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ProgressStats />
        </div>
        <div className="mb-8">
          <div className="bg-black/80 rounded-2xl shadow-2xl p-6">
            <FiltersBar filters={filters} setFilters={setFilters} useDropdowns />
          </div>
        </div>
        <div>
          <div className="bg-black/80 rounded-2xl shadow-2xl p-6">
            <ProblemsTable 
              filters={filters} 
              onDeleteProblem={handleDeleteProblem}
              onAddProblem={handleAddProblem}
              problems={allProblems}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 