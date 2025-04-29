'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { problems as allProblems } from '@/problems';
import { Problem, Submission } from '@/types';
import SubmitModal from './SubmitModal';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CheckCircle } from 'lucide-react';

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
  const [topicProgress, setTopicProgress] = useState<{ [key: string]: { solved: number; total: number } }>({});

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

      // Calculate progress for each topic
      const progress: { [key: string]: { solved: number; total: number } } = {};
      const solvedProblems = new Set(
        submissions
          .filter(s => s.status === 'Solved')
          .map(s => s.problemId)
      );

      // Initialize progress for each topic
      topics.forEach(topic => {
        const topicProblems = allProblems.filter(p => p.topic === topic);
        const solvedCount = topicProblems.filter(p => solvedProblems.has(p.id)).length;
        progress[topic] = {
          solved: solvedCount,
          total: topicProblems.length
        };
      });

      setTopicProgress(progress);
    };
    fetchSubmissions();
  }, [user, topics]);

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
          
          const progress = topicProgress[topic] || { solved: 0, total: 0 };
          const progressPercentage = (progress.solved / progress.total) * 100;
          
          return (
            <div key={topic} className="bg-black/80 rounded-2xl shadow-xl border border-gray-800">
              <button
                className={`w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-white focus:outline-none ${openTopic === topic ? 'border-b border-gray-700' : ''}`}
                onClick={() => setOpenTopic(openTopic === topic ? null : topic)}
              >
                <span>{topic}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm font-normal">
                    <div className="h-2 w-20 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-gray-400 min-w-[60px] text-right">
                      {progress.solved}/{progress.total}
                    </span>
                  </div>
                  <span className="text-gray-400">{openTopic === topic ? '▲' : '▼'}</span>
                </div>
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
                            {isSolved && <CheckCircle className="h-5 w-5 text-green-500" />}
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