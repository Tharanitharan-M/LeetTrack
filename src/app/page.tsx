"use client";

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-x-hidden">
      <Navbar showLogo={true} />
      <main className="flex flex-col items-center justify-center flex-1 w-full pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Track Your LeetCode</span>
              <span className="block text-blue-500">Progress & Improve</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              LeetTrack helps you track your coding interview preparation progress, get AI-powered feedback on your solutions, and improve your problem-solving skills.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/dashboard"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Start Practicing
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-blue-500 mb-4">
                  <svg
                    className="h-12 w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI-Powered Feedback</h3>
                <p className="text-gray-300">
                  Get detailed feedback on your solutions, including time and space complexity analysis, optimized solutions, and pattern recognition.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-blue-500 mb-4">
                  <svg
                    className="h-12 w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3>
                <p className="text-gray-300">
                  Track your progress over time, see which problems you've solved, and identify areas where you need to improve.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-blue-500 mb-4">
                  <svg
                    className="h-12 w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Company Insights</h3>
                <p className="text-gray-300">
                  Learn which companies commonly ask specific problems, helping you prepare for interviews at your target companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-24 text-gray-600 text-sm text-center w-full pb-8">
        &copy; {new Date().getFullYear()} LeetTrack. All rights reserved.
      </footer>
    </div>
  );
}
