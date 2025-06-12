
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProfileData {
  name: string;
  email: string;
  linkedinProfile: string;
  whatDoYouDo: string;
  targetAudience: string;
  mainLinkedInGoal: string;
  headline: string;
  aboutSection: string;
  recentPosts: string;
}

interface Answer {
  question: string;
  answer: string;
  feedback: string;
}

interface AnalysisRequest {
  profileData: ProfileData;
  answers: Answer[];
  openTextAnswer: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileData, answers, openTextAnswer }: AnalysisRequest = await req.json();

    console.log('Generating hyper-personalized audit for:', profileData.name);

    // Calculate overall score based on answers
    const calculateScore = () => {
      let score = 50; // Base score
      
      answers.forEach(answer => {
        switch (answer.answer) {
          case 'Daily':
          case 'Yes, crystal clear':
          case 'Highly compelling, results-focused':
          case 'Always hook within 1-2 lines':
          case 'Yes, every post has a strategic CTA':
          case 'Highly targeted, handpicked prospects':
          case 'Daily strategic engagement':
          case 'Yes, regularly booking qualified calls':
          case 'Yes, comprehensive tracking':
            score += 8;
            break;
          case 'Weekly':
          case 'Somewhat clear':
          case 'Somewhat engaging, could be stronger':
          case 'Sometimes hooks work':
          case 'Sometimes, not always':
          case 'Somewhat targeted':
          case 'Weekly engagement':
          case 'Occasionally, but inconsistent':
          case 'Sometimes track basic metrics':
            score += 4;
            break;
          case 'Monthly':
          case 'Rarely':
          case 'Never':
          case 'No, it\'s vague':
          case 'More like a resume/bio, not client-focused':
          case 'Hooks rarely catch attention':
          case 'Rarely or never':
          case 'Not targeted at all':
          case 'Rarely engage':
          case 'Never engage':
          case 'No, conversations don\'t convert':
          case 'No systematic tracking':
            score += 1;
            break;
        }
      });
      
      return Math.min(Math.max(score, 0), 100);
    };

    const overallScore = calculateScore();

    // Create detailed analysis prompt
    const analysisPrompt = `You are an expert LinkedIn brand strategist who has audited 500+ executive profiles. 

PROFILE DATA:
Name: ${profileData.name}
Role: ${profileData.whatDoYouDo}
Target Audience: ${profileData.targetAudience}
LinkedIn Goal: ${profileData.mainLinkedInGoal}
Current Headline: "${profileData.headline}"
Current About Section: "${profileData.aboutSection}"
Recent Posts: "${profileData.recentPosts || 'Not provided'}"

ASSESSMENT RESPONSES:
${answers.map((answer, index) => `${index + 1}. ${answer.question}\nAnswer: ${answer.answer}`).join('\n\n')}

MAIN CHALLENGE: ${openTextAnswer}

CALCULATED SCORE: ${overallScore}/100

Create a comprehensive, hyper-personalized LinkedIn audit report with these specific sections:

1. PROFILE ANALYSIS (200-250 words):
Analyze their actual headline, about section, and posts. Be specific about what's working and what needs immediate improvement. Reference their exact content.

2. QUESTION INSIGHTS (150-200 words):
Analyze patterns in their responses. Identify their biggest strengths and blind spots based on their answers.

3. PERSONALIZED RECOMMENDATIONS (300-350 words):
Provide specific, actionable recommendations tailored to their role (${profileData.whatDoYouDo}), target audience (${profileData.targetAudience}), and goal (${profileData.mainLinkedInGoal}). Include specific examples of improved headlines, content hooks, and CTAs.

4. ACTION PLAN (200-250 words):
Create a prioritized 30-day implementation plan with specific weekly goals.

5. STRENGTHS (provide exactly 3-4 bullet points):
Based on their responses, what are they already doing well?

6. PRIORITY IMPROVEMENTS (provide exactly 3-4 bullet points):
What are the most critical areas they need to address immediately?

Be direct, specific, and actionable. Use their name throughout. Reference their specific content when analyzing. Focus on lead generation and client acquisition for their target audience.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert LinkedIn strategist who provides detailed, personalized audits for executives and founders. Be specific, actionable, and direct in your analysis.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const fullAnalysis = data.choices[0].message.content;

    // Parse the analysis into sections
    const sections = fullAnalysis.split(/\d+\.\s+[A-Z\s]+:/);
    
    const profileAnalysis = sections[1]?.trim() || 'Analysis unavailable';
    const questionInsights = sections[2]?.trim() || 'Insights unavailable';
    const personalizedRecommendations = sections[3]?.trim() || 'Recommendations unavailable';
    const actionPlan = sections[4]?.trim() || 'Action plan unavailable';
    
    // Extract strengths and improvements from the analysis
    const strengthsMatch = fullAnalysis.match(/STRENGTHS[:\s]*\n?((?:[-•]\s*.+\n?)+)/i);
    const improvementsMatch = fullAnalysis.match(/PRIORITY IMPROVEMENTS[:\s]*\n?((?:[-•]\s*.+\n?)+)/i);
    
    const strengths = strengthsMatch ? 
      strengthsMatch[1].split(/[-•]\s*/).filter(s => s.trim()).map(s => s.trim()) :
      ['Strong foundation in place', 'Good understanding of LinkedIn basics', 'Clear business goals'];
    
    const improvements = improvementsMatch ?
      improvementsMatch[1].split(/[-•]\s*/).filter(s => s.trim()).map(s => s.trim()) :
      ['Optimize headline for better visibility', 'Improve content engagement strategy', 'Develop systematic posting schedule'];

    console.log('Hyper-personalized analysis completed successfully');

    return new Response(JSON.stringify({
      overallScore,
      profileAnalysis,
      questionInsights,
      personalizedRecommendations,
      actionPlan,
      strengths: strengths.slice(0, 4),
      improvements: improvements.slice(0, 4),
      name: profileData.name,
      email: profileData.email
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in hyper-personalized-audit function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate personalized audit. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
