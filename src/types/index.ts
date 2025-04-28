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
  leetcodeUrl: string;
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
  id: string;
  submissionId: string;
  feedbackText: string;
  optimizedCode: string;
  patternDetected: string;
  companiesFound: string[];
  patternSteps: {
    step: number;
    whatToThinkAbout: string;
    why: string;
  }[];
} 