'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { problems } from '@/problems';

interface Stats {
  totalSolved: number;
  streakCount: number;
  topicProgress: {
    [key: string]: {
      solved: number;
      total: number;
    };
  };
}

interface TopicTotals {
  [key: string]: number;
}

export default function DashboardStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalSolved: 0,
    streakCount: 0,
    topicProgress: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        // Fetch user's submissions
        const submissionsRef = collection(db, 'submissions');
        const q = query(submissionsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const solvedProblems = new Set<string>();
        const topicCount: { [key: string]: { solved: number; total: number } } = {};

        // Create a map for quick problemId -> topic lookup
        const problemIdToTopic: { [key: string]: string } = {};
        problems.forEach((problem) => {
          problemIdToTopic[problem.id] = problem.topic;
        });

        // Track which problems have been counted as solved per topic
        const countedProblems = new Set<string>();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === 'Solved') {
            solvedProblems.add(data.problemId);
            const topic = problemIdToTopic[data.problemId];
            if (!topic) return; // skip if topic not found
            // Only count the first solved submission per problem
            const uniqueKey = `${topic}::${data.problemId}`;
            if (countedProblems.has(uniqueKey)) return;
            countedProblems.add(uniqueKey);
            if (!topicCount[topic]) {
              topicCount[topic] = { solved: 0, total: 0 };
            }
            topicCount[topic].solved++;
          }
        });

        // TODO: Fetch total problems per topic from problems collection
        // For now, using dummy data
        const dummyTopicTotals: TopicTotals = {
          'Arrays': 14,
          'Strings': 12,
          'Linked Lists': 8,
          'Trees': 10,
          'Dynamic Programming': 15,
        };

        Object.keys(dummyTopicTotals).forEach(topic => {
          if (!topicCount[topic]) {
            topicCount[topic] = { solved: 0, total: dummyTopicTotals[topic] };
          } else {
            topicCount[topic].total = dummyTopicTotals[topic];
          }
        });

        setStats({
          totalSolved: solvedProblems.size,
          streakCount: user.streakCount,
          topicProgress: topicCount,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-gray-400 text-sm font-medium">Total Problems Solved</h3>
        <p className="text-2xl font-bold text-white mt-2">
          {stats.totalSolved}/150
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-gray-400 text-sm font-medium">Current Streak</h3>
        <p className="text-2xl font-bold text-white mt-2">
          {stats.streakCount} days
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-gray-400 text-sm font-medium">Topic Progress</h3>
        <div className="mt-2 space-y-2">
          {Object.entries(stats.topicProgress).map(([topic, progress]) => (
            <div key={topic} className="flex justify-between items-center">
              <span className="text-sm text-gray-300">{topic}</span>
              <span className="text-sm text-white">
                {progress.solved}/{progress.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 