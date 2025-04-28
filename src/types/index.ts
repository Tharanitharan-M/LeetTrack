export interface User {
  uid: string;
  email: string;
  displayName: string;
  streakCount: number;
  lastSolvedDate: string | null;
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
} 