
import { ProfileData, Answer, AnalysisResponse } from './types.ts';

export const createAnalysisPrompt = (
  profileData: ProfileData,
  answers: Answer[],
  openTextAnswer: string,
  overallScore: number
): string => {
  return `You are a senior LinkedIn strategist with 15+ years of experience helping executives optimize their personal brands. Analyze the following LinkedIn profile and assessment responses to provide professional, actionable insights.

PROFILE INFORMATION:
Name: ${profileData.name}
Role: ${profileData.whatDoYouDo}
Target Audience: ${profileData.targetAudience}
LinkedIn Goal: ${profileData.mainLinkedInGoal}
Current Headline: "${profileData.headline}"
Current About Section: "${profileData.aboutSection}"

ASSESSMENT RESPONSES:
${answers && answers.length > 0 ? answers.map((answer, index) => `${index + 1}. ${answer.question}\nResponse: ${answer.answer}`).join('\n\n') : 'No assessment responses provided'}

PRIMARY CHALLENGE: ${openTextAnswer || 'Not specified'}

CALCULATED SCORE: ${overallScore}/100

Please provide a comprehensive LinkedIn audit in JSON format with the following structure. Write in a professional, consultative tone that an executive would expect from a senior strategist:

{
  "profileAnalysis": "Detailed analysis of their current headline and about section with specific improvement recommendations",
  "questionInsights": "Strategic insights based on their assessment responses, identifying key patterns and opportunities",
  "personalizedRecommendations": "Specific, actionable recommendations tailored to their role, audience, and goals",
  "actionPlan": "Clear 30-day implementation plan with weekly milestones and specific tasks",
  "strengths": ["List of 3-4 current strengths based on their profile and responses"],
  "improvements": ["List of 3-4 priority improvements they should focus on immediately"]
}

Guidelines:
- Write in a professional, consultative tone
- Provide specific, actionable advice
- Reference their actual content when analyzing
- Focus on business impact and ROI
- Avoid overly promotional or sales-heavy language
- Make recommendations practical and implementable
- Use executive-level communication style`;
};

export const createFallbackAnalysis = (profileData: ProfileData, overallScore: number): AnalysisResponse => {
  return {
    profileAnalysis: `Your current LinkedIn presence shows potential but needs strategic optimization to effectively reach ${profileData.targetAudience}. Your headline "${profileData.headline}" contains relevant keywords but could be more outcome-focused. Consider restructuring it to clearly communicate the specific value you provide to ${profileData.targetAudience}. Your about section would benefit from a more strategic narrative that addresses your target audience's key challenges and positions you as the solution provider.`,
    
    questionInsights: `Based on your assessment responses, several strategic opportunities emerge. Your current LinkedIn approach shows ${overallScore >= 70 ? 'strong fundamentals with room for optimization' : overallScore >= 50 ? 'solid foundations that need strategic refinement' : 'significant potential for improvement through systematic optimization'}. The key areas requiring immediate attention align with your goal of ${profileData.mainLinkedInGoal}.`,
    
    personalizedRecommendations: `For your role as ${profileData.whatDoYouDo}, focus on creating a content strategy that demonstrates subject matter expertise while addressing ${profileData.targetAudience}'s specific pain points. Develop a professional content calendar that balances thought leadership, industry insights, and strategic engagement. Your headline should clearly articulate the transformation you provide, while your about section should follow a problem-solution-credibility structure that resonates with decision-makers.`,
    
    actionPlan: `Week 1: Optimize your headline and about section using professional copywriting principles. Week 2: Develop a strategic content calendar with 3-4 high-value posts per week. Week 3: Implement systematic engagement with target prospects and industry leaders. Week 4: Launch refined content strategy and establish performance tracking systems to measure engagement and conversion metrics.`,
    
    strengths: [
      'Clear understanding of target market and business objectives',
      'Professional background that establishes industry credibility',
      'Recognition of LinkedIn\'s importance for business development',
      'Commitment to improving your professional online presence'
    ],
    
    improvements: [
      'Optimize headline for client-focused, outcome-driven messaging',
      'Restructure about section to address target audience pain points',
      'Develop consistent, value-driven content strategy',
      'Implement systematic prospect engagement and relationship building'
    ]
  };
};
