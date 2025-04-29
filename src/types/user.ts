export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  lastLoginAt: Date;
  streakCount: number;
  lastSolvedDate: Date | null;
  totalSolved: number;
  inProgress: number;
  unsolved: number;
  completionPercentage: number;
  topicProgress: Record<string, number>;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    difficulty: 'easy' | 'medium' | 'hard' | 'all';
    topics: string[];
    sortBy: 'title' | 'difficulty' | 'status' | 'lastAttempted';
    sortOrder: 'asc' | 'desc';
  };
} 