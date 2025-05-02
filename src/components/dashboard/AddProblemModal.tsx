import { useState } from 'react';
import { Problem } from '@/types';
import { Trash2 } from 'lucide-react';

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (problem: Omit<Problem, 'id'>) => void;
}

export default function AddProblemModal({ isOpen, onClose, onAdd }: AddProblemModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'Easy',
    topic: '',
    companies: [] as string[],
    leetcodeUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      title: '',
      difficulty: 'Easy',
      topic: '',
      companies: [],
      leetcodeUrl: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Add New Problem</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300">
              Difficulty
            </label>
            <select
              id="difficulty"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-300">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="leetcodeUrl" className="block text-sm font-medium text-gray-300">
              LeetCode URL
            </label>
            <input
              type="url"
              id="leetcodeUrl"
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.leetcodeUrl}
              onChange={(e) => setFormData({ ...formData, leetcodeUrl: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 