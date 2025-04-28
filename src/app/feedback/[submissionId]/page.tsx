'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Layout from '@/components/layout/Layout';
import { Submission, Problem, Feedback } from '@/types';

export default function FeedbackPage() {
  const { submissionId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !submissionId) return;

      try {
        // Fetch submission
        const submissionDoc = await getDoc(doc(db, 'submissions', submissionId as string));
        if (!submissionDoc.exists()) {
          throw new Error('Submission not found');
        }
        const submissionData = submissionDoc.data() as Submission;
        setSubmission(submissionData);

        // Fetch problem
        const problemDoc = await getDoc(doc(db, 'problems', submissionData.problemId));
        if (!problemDoc.exists()) {
          throw new Error('Problem not found');
        }
        const problemData = problemDoc.data() as Problem;
        setProblem(problemData);

        // Fetch feedback
        const feedbackDoc = await getDoc(doc(db, 'feedbacks', submissionId as string));
        if (feedbackDoc.exists()) {
          const feedbackData = feedbackDoc.data() as Feedback;
          setFeedback(feedbackData);
        }

        // TODO: If feedback doesn't exist, trigger AI analysis
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, submissionId]);

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!submission || !problem) {
    return (
      <Layout>
        <div className="text-center text-gray-400">
          <h2 className="text-2xl font-bold">Submission not found</h2>
          <p className="mt-2">The submission you're looking for doesn't exist or you don't have access to it.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
          <p className="mt-2 text-gray-400">Feedback for your solution</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Solution */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Your Solution</h2>
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-gray-300">{submission.code}</code>
            </pre>
            <div className="mt-4 space-y-2">
              <p className="text-gray-400">
                <span className="font-medium">Time Complexity:</span> {submission.timeComplexity}
              </p>
              <p className="text-gray-400">
                <span className="font-medium">Space Complexity:</span> {submission.spaceComplexity}
              </p>
            </div>
          </div>

          {/* AI Feedback */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">AI Analysis</h2>
            {feedback ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-300 mb-2">Feedback</h3>
                  <p className="text-gray-400">{feedback.feedbackText}</p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-300 mb-2">Pattern Detected</h3>
                  <p className="text-gray-400">{feedback.patternDetected}</p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-300 mb-2">Companies</h3>
                  <div className="flex flex-wrap gap-2">
                    {feedback.companiesFound.map((company) => (
                      <span
                        key={company}
                        className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-300 mb-2">Pattern for Solving</h3>
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Step
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          What to Think About
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Why
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {feedback.patternSteps.map((step) => (
                        <tr key={step.step}>
                          <td className="px-4 py-2 text-sm text-gray-300">{step.step}</td>
                          <td className="px-4 py-2 text-sm text-gray-300">{step.whatToThinkAbout}</td>
                          <td className="px-4 py-2 text-sm text-gray-300">{step.why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {feedback.optimizedCode && (
                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-2">Optimized Solution</h3>
                    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-gray-300">{feedback.optimizedCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <p>AI analysis in progress...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 