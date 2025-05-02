export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
  streakCount: number;
  lastSolvedDate: Date | null;
  totalSolved: number;
  inProgress: number;
  unsolved: number;
  completionPercentage: number;
  topicProgress: {
    [key: string]: {
      solved: number;
      total: number;
    };
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    difficulty: string[];
    topics: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  companies: string[];
  acceptanceRate: string;
  leetcodeUrl: string;
  description?: string;
  constraints?: string[];
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  status: 'Solved' | 'In Progress';
  submittedAt: string;
}

export interface Feedback {
  id?: string;
  submissionId: string;
  feedbackText: string;
  optimizedCode: string;
  patternDetected: string;
  companiesFound: string[];
  patternThinkingSteps: {
    title: string;
    description: string;
  }[];
  aiThoughtProcess?: {
    codeAnalysis: string;
    approachEvaluation: string;
    timeComplexityAnalysis: string;
    alternativeApproaches: {
      approach: string;
      tradeoffs: string;
    }[];
  };
} 