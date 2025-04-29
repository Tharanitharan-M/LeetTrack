'use client';

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import ProgressStats from '@/components/dashboard/ProgressStats';
import ProblemsTable from '@/components/dashboard/ProblemsTable';
import FiltersBar from '@/components/dashboard/FiltersBar';
import { useState } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    difficulty: 'all',
    status: 'all',
    companies: [] as string[],
    topics: [] as string[],
  });

  return (
    <Layout showLogo={true}>
      <div className="pt-8 pb-4 bg-black/90 w-full text-center border-b border-gray-800 mb-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">Your DSA Dashboard</span>
          <span className="block text-blue-500 bg-clip-text">Progress & Practice</span>
        </h1>
        <div className="mt-2 text-lg text-gray-300">
          Welcome back, <span className="text-white font-bold">{user?.displayName}</span>!
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ProgressStats />
        </div>
        <div className="mb-8">
          <div className="bg-black/80 rounded-2xl shadow-2xl p-6">
            <FiltersBar filters={filters} setFilters={setFilters} useDropdowns />
          </div>
        </div>
        <div>
          <div className="bg-black/80 rounded-2xl shadow-2xl p-6">
            <ProblemsTable filters={filters} />
          </div>
        </div>
      </div>
    </Layout>
  );
} 