export interface ProfileData {
  name: string;
  email: string;
  whatDoYouDo: string;
  targetAudience: string;
  mainLinkedInGoal: string;
  headline: string;
  aboutSection: string;
  recentPosts: string;
}

export interface Answer {
  question: string;
  answer: string;
  feedback: string;
}

export interface HyperPersonalizedAnalysis {
  overallScore: number;
  profileAnalysis: string;
  questionInsights: string;
  personalizedRecommendations: string;
  actionPlan: string;
  strengths: string[];
  improvements: string[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  feedback: Record<string, string>;
}
