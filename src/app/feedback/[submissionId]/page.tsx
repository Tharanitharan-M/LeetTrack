'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection } from 'firebase/firestore';
import Layout from '@/components/layout/Layout';
import { Submission, Problem, Feedback } from '@/types';
import SubmitModal from '@/components/dashboard/SubmitModal';
import CodeBlock from '@/components/common/CodeBlock';

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

        // Fetch problem from Firebase
        const problemDoc = await getDoc(doc(db, 'problems', submissionData.problemId));
        if (!problemDoc.exists()) {
          // Try fetching from userProblems if not found in problems collection
          const userProblemDoc = await getDoc(doc(db, 'userProblems', submissionData.problemId));
          if (!userProblemDoc.exists()) {
            throw new Error('Problem not found');
          }
          const problemData = { id: userProblemDoc.id, ...userProblemDoc.data() } as Problem;
          if (!isMounted) return;
          setProblem(problemData);
        } else {
          const problemData = { id: problemDoc.id, ...problemDoc.data() } as Problem;
          if (!isMounted) return;
          setProblem(problemData);
        }

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
      <div className="max-w-4xl mx-auto space-y-8 mt-8 px-4">
        {/* Header */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-blue-500/20">
          <h1 className="text-2xl font-bold text-blue-400">{problem.title}</h1>
          <p className="mt-2 text-gray-300">Feedback for your solution</p>
        </div>

        {/* Your Solution */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-blue-500/20">
          <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Your Solution
          </h2>
          <CodeBlock code={submission.code} language={submission.language} />
        </div>

        {/* Your Thought Process */}
        {submission.approach && (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-blue-500/20">
            <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Your Thought Process
            </h2>
            <p className="text-gray-300">{submission.approach}</p>
          </div>
        )}

        {/* Complexity Analysis */}
        {(submission.timeComplexity || submission.spaceComplexity) && (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-blue-500/20">
            <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Complexity Analysis
            </h2>
            <div className="space-y-2">
              {submission.timeComplexity && (
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <span className="font-medium text-blue-300">Time Complexity:</span>
                  <span className="text-gray-300 ml-2">{submission.timeComplexity}</span>
                </div>
              )}
              {submission.spaceComplexity && (
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <span className="font-medium text-blue-300">Space Complexity:</span>
                  <span className="text-gray-300 ml-2">{submission.spaceComplexity}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Analysis */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-blue-500/20">
          <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Analysis
          </h2>
          {feedback ? (
            <div className="space-y-6">
              {/* General Feedback */}
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-md font-medium text-blue-300 mb-2">Feedback</h3>
                <p className="text-gray-300">{feedback.feedbackText}</p>
              </div>

              {/* Pattern and Companies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-md font-medium text-blue-300 mb-2">Pattern Detected</h3>
                  <p className="text-gray-300">{feedback.patternDetected}</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-md font-medium text-blue-300 mb-2">Companies</h3>
                  <div className="flex flex-wrap gap-2">
                    {(feedback.companiesFound ?? []).map((company) => (
                      <span
                        key={company}
                        className="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Thought Process */}
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-md font-medium text-blue-300 mb-2">Problem-Solving Approach</h3>
                <div className="space-y-4">
                  {(feedback.patternThinkingSteps ?? []).map((step, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-4">
                      <div className="font-semibold text-blue-300">{step.title}</div>
                      <div className="text-gray-300">{step.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Thought Process Analysis */}
              {feedback.aiThoughtProcess && (
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    AI Thought Process
                  </h3>
                  
                  {/* Code Analysis */}
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-blue-300 mb-2">Code Analysis</h4>
                    <p className="text-gray-300">{feedback.aiThoughtProcess.codeAnalysis}</p>
                  </div>

                  {/* Approach Evaluation */}
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-blue-300 mb-2">Approach Evaluation</h4>
                    <p className="text-gray-300">{feedback.aiThoughtProcess.approachEvaluation}</p>
                  </div>

                  {/* Time Complexity Analysis */}
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-blue-300 mb-2">Time Complexity Analysis</h4>
                    <p className="text-gray-300">{feedback.aiThoughtProcess.timeComplexityAnalysis}</p>
                  </div>

                  {/* Alternative Approaches */}
                  {feedback.aiThoughtProcess.alternativeApproaches && feedback.aiThoughtProcess.alternativeApproaches.length > 0 && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-blue-300 mb-2">Alternative Approaches</h4>
                      <div className="space-y-4">
                        {feedback.aiThoughtProcess.alternativeApproaches.map((alt, idx) => (
                          <div key={idx} className="border-l-4 border-green-500 pl-4">
                            <div className="font-semibold text-green-300">{alt.approach}</div>
                            <div className="text-gray-300">{alt.tradeoffs}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Optimized Solution */}
              {feedback.optimizedCode && (
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-md font-medium text-blue-300 mb-2">Optimized Solution</h3>
                  <CodeBlock code={feedback.optimizedCode} language={submission.language} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center text-gray-300 gap-4">
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-blue-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span>AI analysis in progress...</span>
              </div>
              {llmStatus === 'pending' && <span className="text-xs text-gray-400">Waiting for LLM feedback. This may take up to a minute.</span>}
              {llmStatus === 'timeout' && <span className="text-xs text-red-400">LLM did not respond in time. Please try again later or resubmit.</span>}
              {llmStatus === 'error' && <span className="text-xs text-red-400">An error occurred while fetching feedback. Please try again.</span>}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
          <button
            className="px-6 py-3 rounded-lg border border-blue-500 text-blue-400 bg-transparent font-semibold text-lg shadow hover:bg-blue-500/10 transition w-full sm:w-auto"
            onClick={() => setIsResubmitOpen(true)}
          >
            Resubmit
          </button>
          <button
            className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-lg hover:bg-blue-600 transition w-full sm:w-auto"
            onClick={() => window.location.href = '/dashboard'}
          >
            Back to Dashboard
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