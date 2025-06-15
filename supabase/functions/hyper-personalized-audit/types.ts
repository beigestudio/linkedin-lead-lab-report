
export interface ProfileData {
  name: string;
  email: string;
  whatDoYouDo: string;
  targetAudience: string;
  mainLinkedInGoal: string;
  headline: string;
  aboutSection: string;
}

export interface Answer {
  question: string;
  answer: string;
  feedback: string;
}

export interface AnalysisRequest {
  profileData: ProfileData;
  answers: Answer[];
  openTextAnswer: string;
}

export interface AnalysisResponse {
  profileAnalysis: string;
  questionInsights: string;
  personalizedRecommendations: string;
  actionPlan: string;
  strengths: string[];
  improvements: string[];
}
