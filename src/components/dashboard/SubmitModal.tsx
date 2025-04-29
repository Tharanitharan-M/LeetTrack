'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Problem } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import MonacoEditor from '@monaco-editor/react';

const LANGUAGES = [
  { label: 'Python', value: 'python' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'C', value: 'c' },
  { label: 'Go', value: 'go' },
];

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem;
  initialData?: any;
  isResubmission?: boolean;
}

export default function SubmitModal({ isOpen, onClose, problem, initialData, isResubmission }: SubmitModalProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    approach: initialData?.approach || '',
    timeComplexity: initialData?.timeComplexity || '',
    spaceComplexity: initialData?.spaceComplexity || '',
    language: initialData?.language || LANGUAGES[0].value,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        approach: initialData.approach || '',
        timeComplexity: initialData.timeComplexity || '',
        spaceComplexity: initialData.spaceComplexity || '',
        language: initialData.language || LANGUAGES[0].value,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      let submissionId;
      if (isResubmission && initialData?.id) {
        // Update existing submission
        submissionId = initialData.id;
        await updateDoc(doc(db, 'submissions', submissionId), {
          code: formData.code,
          approach: formData.approach,
          timeComplexity: formData.timeComplexity,
          spaceComplexity: formData.spaceComplexity,
          language: formData.language,
          status: 'In Progress',
          submittedAt: new Date().toISOString(),
        });
      } else {
        // Create new submission
        const submissionRef = await addDoc(collection(db, 'submissions'), {
          userId: user.uid,
          problemId: problem.id,
          code: formData.code,
          approach: formData.approach,
          timeComplexity: formData.timeComplexity,
          spaceComplexity: formData.spaceComplexity,
          language: formData.language,
          status: 'In Progress',
          submittedAt: new Date().toISOString(),
        });
        submissionId = submissionRef.id;
      }

      // Trigger AI feedback API (fire-and-forget)
      const feedbackPayload = {
        code: formData.code,
        language: formData.language,
        approach: formData.approach,
        problemTitle: problem.title,
        submissionId,
      };
      console.log('Sending to /api/feedback:', feedbackPayload);
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackPayload),
      }).catch((err) => {
        toast.error('Failed to trigger AI feedback.');
        console.error('Feedback API error:', err);
      });

      router.push(`/feedback/${submissionId}`);
      toast.success('Solution submitted successfully!');
    } catch (error) {
      console.error('Error submitting solution:', error);
      toast.error('Failed to submit solution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-gray-800 text-gray-400 hover:text-gray-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-white">
                      Submit Solution for {problem.title}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
                          Language
                        </label>
                        <select
                          id="language"
                          className="block w-48 rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm mb-2"
                          value={formData.language}
                          onChange={e => setFormData({ ...formData, language: e.target.value })}
                        >
                          {LANGUAGES.map(lang => (
                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Solution
                        </label>
                        <div className="rounded-md overflow-hidden border border-gray-700 bg-gray-700">
                          <MonacoEditor
                            height="250px"
                            defaultLanguage={formData.language}
                            language={formData.language}
                            theme="vs-dark"
                            value={formData.code}
                            onChange={value => setFormData({ ...formData, code: value || '' })}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              scrollBeyondLastLine: false,
                              wordWrap: 'on',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="approach" className="block text-sm font-medium text-gray-300">
                          Approach Explanation
                        </label>
                        <textarea
                          id="approach"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={formData.approach}
                          onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="timeComplexity" className="block text-sm font-medium text-gray-300">
                            Time Complexity
                          </label>
                          <input
                            type="text"
                            id="timeComplexity"
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={formData.timeComplexity}
                            onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="spaceComplexity" className="block text-sm font-medium text-gray-300">
                            Space Complexity
                          </label>
                          <input
                            type="text"
                            id="spaceComplexity"
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={formData.spaceComplexity}
                            onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Submitting...' : 'Submit Solution'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-600 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 