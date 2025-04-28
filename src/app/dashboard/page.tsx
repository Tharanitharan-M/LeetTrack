'use client';

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
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
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">Dashboard</h1>
          <div className="text-white text-lg font-medium">
            Welcome back, <span className="text-white font-bold">{user?.displayName}</span>!
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-black/90 to-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl p-6 text-white">
            <DashboardStats />
          </div>
        </div>

        <div className="bg-gradient-to-br from-black/90 to-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl p-6 text-white">
          <FiltersBar filters={filters} setFilters={setFilters} />
        </div>

        <div className="bg-gradient-to-br from-black/90 to-gray-900/80 border border-gray-800 rounded-2xl shadow-2xl p-6 text-white">
          <ProblemsTable filters={filters} />
        </div>
      </div>
    </Layout>
  );
} 