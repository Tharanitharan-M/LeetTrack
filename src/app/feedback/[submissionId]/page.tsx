'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Layout from '@/components/layout/Layout';
import { Submission, Problem, Feedback } from '@/types';
import { problems } from '@/problems';
import SubmitModal from '@/components/dashboard/SubmitModal';

export default function FeedbackPage() {
  const { submissionId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [llmStatus, setLlmStatus] = useState<'pending' | 'error' | 'timeout' | 'done'>('pending');
  const pollTimeout = useRef<NodeJS.Timeout | null>(null);
  const pollStart = useRef<number>(Date.now());
  const [isResubmitOpen, setIsResubmitOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!user || !submissionId) return;
      setLoading(true);
      try {
        // Fetch submission
        const submissionDoc = await getDoc(doc(db, 'submissions', submissionId as string));
        if (!submissionDoc.exists()) {
          throw new Error('Submission not found');
        }
        const submissionData = submissionDoc.data() as Submission;
        if (!isMounted) return;
        setSubmission(submissionData);

        // Fetch problem from local array
        const problemData = problems.find(p => p.id === submissionData.problemId) || null;
        if (!isMounted) return;
        setProblem(problemData);

        // Fetch feedback
        const feedbackDoc = await getDoc(doc(db, 'feedback', submissionId as string));
        if (feedbackDoc.exists()) {
          const feedbackData = feedbackDoc.data() as Feedback;
          if (!isMounted) return;
          setFeedback(feedbackData);
          setLlmStatus('done');
        } else {
          setFeedback(null);
          setLlmStatus('pending');
        }
      } catch (error) {
        if (!isMounted) return;
        setLlmStatus('error');
        console.error('Error fetching data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Poll for feedback every 5 seconds if not found
    if (!feedback) {
      pollTimeout.current = setInterval(async () => {
        // Timeout after 60 seconds
        if (Date.now() - pollStart.current > 60000) {
          setLlmStatus('timeout');
          if (pollTimeout.current) clearInterval(pollTimeout.current);
          return;
        }
        const feedbackDoc = await getDoc(doc(db, 'feedback', submissionId as string));
        if (feedbackDoc.exists()) {
          const feedbackData = feedbackDoc.data() as Feedback;
          setFeedback(feedbackData);
          setLlmStatus('done');
          if (pollTimeout.current) clearInterval(pollTimeout.current);
        }
      }, 5000);
    }
    return () => {
      isMounted = false;
      if (pollTimeout.current) clearInterval(pollTimeout.current);
    };
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
          <h2 className="text-2xl font-bold">{!submission ? 'Submission not found' : 'Problem not found'}</h2>
          <p className="mt-2">The submission or problem you're looking for doesn't exist or you don't have access to it.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 mt-8">
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
                    {(feedback.companiesFound ?? []).map((company) => (
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
                  <div className="space-y-4">
                    {(feedback.patternThinkingSteps ?? []).map((step, idx) => (
                      <div key={idx} className="border-l-4 border-blue-600 pl-4">
                        <div className="font-semibold text-blue-300">{step.title}</div>
                        <div className="text-gray-400">{step.description}</div>
                      </div>
                    ))}
                  </div>
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
              <div className="flex flex-col items-center text-center text-gray-400 gap-4">
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6 text-blue-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span>AI analysis in progress...</span>
                </div>
                {llmStatus === 'pending' && <span className="text-xs text-gray-500">Waiting for LLM feedback. This may take up to a minute.</span>}
                {llmStatus === 'timeout' && <span className="text-xs text-red-400">LLM did not respond in time. Please try again later or resubmit.</span>}
                {llmStatus === 'error' && <span className="text-xs text-red-400">An error occurred while fetching feedback. Please try again.</span>}
              </div>
            )}
          </div>
        </div>
        {/* Resubmit Button */}
        <div className="flex justify-end mt-8">
          <button
            className="px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-600 transition"
            onClick={() => setIsResubmitOpen(true)}
          >
            Resubmit
          </button>
        </div>
        {/* Resubmit Modal */}
        {isResubmitOpen && submission && problem && (
          <SubmitModal
            isOpen={isResubmitOpen}
            onClose={() => setIsResubmitOpen(false)}
            problem={problem}
            initialData={submission}
            isResubmission={true}
          />
        )}
      </div>
    </Layout>
  );
} 