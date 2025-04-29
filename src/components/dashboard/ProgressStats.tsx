'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Submission } from '@/types';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';
import { problems } from '@/problems';
import { Flame } from 'lucide-react';

export default function ProgressStats() {
  const { user } = useAuth();
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState({
    totalProblems: problems.length,
    solvedProblems: 0,
    streak: 0,
    unsolvedProblems: problems.length,
    completionPercentage: 0,
  });

  useEffect(() => {
    if (!user) return;
    
    const fetchSubmissions = async () => {
      const q = query(
        collection(db, 'submissions'), 
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const submissions: Submission[] = [];
      querySnapshot.forEach((doc) => {
        submissions.push({ id: doc.id, ...doc.data() } as Submission);
      });
      setUserSubmissions(submissions);
      
      // Calculate stats
      const solvedProblemIds = new Set(
        submissions
          .filter(s => s.status === 'Solved')
          .map(s => s.problemId)
      );
      
      const solvedCount = solvedProblemIds.size;
      const unsolvedCount = problems.length - solvedCount;
      const completionPercentage = (solvedCount / problems.length) * 100;
      
      setStats({
        totalProblems: problems.length,
        solvedProblems: solvedCount,
        streak: user.streakCount,
        unsolvedProblems: unsolvedCount,
        completionPercentage,
      });
    };
    
    fetchSubmissions();
  }, [user]);

  return (
    <div className="bg-black/80 rounded-2xl shadow-xl border border-gray-800 p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Your Progress</h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-shrink-0">
          <AnimatedCircularProgressBar 
            value={stats.completionPercentage}
            size={150}
            strokeWidth={10}
            gaugePrimaryColor="#10b981"
            gaugeSecondaryColor="#1e293b"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{stats.solvedProblems}</div>
            <div className="text-sm text-gray-400">Solved</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <div className="text-3xl font-bold text-orange-500">{stats.streak}</div>
            </div>
            <div className="text-sm text-gray-400">Current Streak</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-gray-400">{stats.unsolvedProblems}</div>
            <div className="text-sm text-gray-400">Unsolved</div>
          </div>
        </div>
      </div>
    </div>
  );
} 