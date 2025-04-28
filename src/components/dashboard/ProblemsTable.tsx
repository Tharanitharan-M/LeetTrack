'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Problem } from '@/types';
import SubmitModal from './SubmitModal';

interface ProblemsTableProps {
  filters: {
    difficulty: string;
    status: string;
    companies: string[];
    topics: string[];
  };
}

export default function ProblemsTable({ filters }: ProblemsTableProps) {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      if (!user) return;

      try {
        // TODO: Replace with actual Firestore query
        // For now, using dummy data
        const dummyProblems: Problem[] = [
          {
            id: '1',
            title: 'Two Sum',
            difficulty: 'Easy',
            topic: 'Arrays',
            companies: ['Google', 'Amazon', 'Microsoft'],
            leetcodeUrl: 'https://leetcode.com/problems/two-sum',
          },
          {
            id: '2',
            title: 'Add Two Numbers',
            difficulty: 'Medium',
            topic: 'Linked Lists',
            companies: ['Amazon', 'Microsoft'],
            leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers',
          },
          // Add more dummy problems...
        ];

        // Apply filters
        let filteredProblems = dummyProblems;

        if (filters.difficulty !== 'all') {
          filteredProblems = filteredProblems.filter(
            (p) => p.difficulty === filters.difficulty
          );
        }

        if (filters.status !== 'all') {
          // TODO: Implement status filtering based on user's submissions
        }

        if (filters.companies.length > 0) {
          filteredProblems = filteredProblems.filter((p) =>
            p.companies.some((c) => filters.companies.includes(c))
          );
        }

        if (filters.topics.length > 0) {
          filteredProblems = filteredProblems.filter((p) =>
            filters.topics.includes(p.topic)
          );
        }

        setProblems(filteredProblems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [user, filters]);

  const handleSubmitClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setIsSubmitModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Problem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Topic
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Companies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={problem.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400"
                  >
                    {problem.title}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      problem.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-800'
                        : problem.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {problem.topic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {problem.companies.map((company) => (
                      <span
                        key={company}
                        className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-300">Unsolved</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleSubmitClick(problem)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Submit Solution
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProblem && (
        <SubmitModal
          isOpen={isSubmitModalOpen}
          onClose={() => {
            setIsSubmitModalOpen(false);
            setSelectedProblem(null);
          }}
          problem={selectedProblem}
        />
      )}
    </>
  );
} 