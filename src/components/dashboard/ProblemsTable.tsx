'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { problems as allProblems } from '@/problems';
import { Problem, Submission } from '@/types';
import SubmitModal from './SubmitModal';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ProblemsTableProps {
  filters: {
    difficulty: string;
    status: string;
    companies: string[];
    topics: string[];
  };
}

const getUniqueTopics = (problems: Problem[]) =>
  Array.from(new Set(problems.map((p) => p.topic)));

export default function ProblemsTable({ filters }: ProblemsTableProps) {
  const { user } = useAuth();
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchSubmissions = async () => {
      const q = query(collection(db, 'submissions'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const submissions: Submission[] = [];
      querySnapshot.forEach((doc) => {
        submissions.push({ id: doc.id, ...doc.data() } as Submission);
      });
      setUserSubmissions(submissions);
    };
    fetchSubmissions();
  }, [user]);

  // Apply difficulty and companies filters (already present)
  let filteredProblems = allProblems;
  if (filters.difficulty !== 'all') {
    filteredProblems = filteredProblems.filter(
      (p) => p.difficulty === filters.difficulty
    );
  }
  if (filters.companies.length > 0) {
    filteredProblems = filteredProblems.filter((p) =>
      p.companies.some((c) => filters.companies.includes(c))
    );
  }

  // Apply topics filter
  if (filters.topics.length > 0) {
    filteredProblems = filteredProblems.filter((p) =>
      filters.topics.includes(p.topic)
    );
  }

  // Apply status filter
  if (filters.status !== 'all') {
    filteredProblems = filteredProblems.filter((p) => {
      const userProblemSubmissions = userSubmissions.filter(
        (s) => s.problemId === p.id
      );
      if (filters.status === 'Solved') {
        return userProblemSubmissions.some((s) => s.status === 'Solved');
      } else if (filters.status === 'In Progress') {
        return userProblemSubmissions.some((s) => s.status === 'In Progress');
      } else if (filters.status === 'Unsolved') {
        return userProblemSubmissions.length === 0;
      }
      return true;
    });
  }

  const topics = getUniqueTopics(allProblems);

  const handleSubmitClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setIsSubmitModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {topics.map((topic) => {
          const topicProblems = filteredProblems.filter((p) => p.topic === topic);
          if (topicProblems.length === 0) return null;
          return (
            <div key={topic} className="bg-black/80 rounded-2xl shadow-xl border border-gray-800">
              <button
                className={`w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-white focus:outline-none ${openTopic === topic ? 'border-b border-gray-700' : ''}`}
                onClick={() => setOpenTopic(openTopic === topic ? null : topic)}
              >
                <span>{topic}</span>
                <span className="text-sm text-gray-400">({topicProblems.length}) {openTopic === topic ? '▲' : '▼'}</span>
              </button>
              {openTopic === topic && (
                <div className="divide-y divide-gray-800">
                  {topicProblems.map((problem) => {
                    // Find the latest solved submission for this problem
                    const solvedSubmissions = userSubmissions
                      .filter((s) => s.problemId === problem.id && s.status === 'Solved')
                      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
                    const latestSolved = solvedSubmissions[0];
                    const isSolved = !!latestSolved;
                    return (
                      <div
                        key={problem.id}
                        className={`flex flex-col md:flex-row md:items-center justify-between px-6 py-3 gap-2 hover:bg-gray-900/60 transition ${isSolved ? 'bg-green-900/30' : ''}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
                          <span className="flex items-center gap-2">
                            {isSolved && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
                            <a
                              href={problem.leetcodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-medium text-base flex items-center gap-1 ${isSolved ? 'text-green-300' : 'text-white hover:text-blue-400'}`}
                            >
                              {problem.title}
                            </a>
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ml-2
                              ${problem.difficulty === 'Easy' ? 'bg-green-700 text-green-200' :
                                problem.difficulty === 'Medium' ? 'bg-yellow-700 text-yellow-200' :
                                'bg-red-700 text-red-200'}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          {isSolved ? (
                            <a
                              href={`/feedback/${latestSolved.id}`}
                              className="px-3 py-1 rounded-lg bg-green-700 text-white text-xs font-semibold hover:bg-green-600 transition"
                            >
                              View Feedback
                            </a>
                          ) : (
                            <button
                              onClick={() => handleSubmitClick(problem)}
                              className="px-3 py-1 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-600 transition"
                            >
                              Submit Solution
                            </button>
                          )}
                          <a
                            href={problem.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-lg bg-yellow-500 text-black text-xs font-semibold hover:bg-yellow-400 transition flex items-center gap-1"
                          >
                            LeetCode
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
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