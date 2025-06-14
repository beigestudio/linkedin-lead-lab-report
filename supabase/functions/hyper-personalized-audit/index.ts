
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
  whatDoYouDo: string;
  targetAudience: string;
  mainLinkedInGoal: string;
  headline: string;
  aboutSection: string;
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

interface AnalysisResponse {
  profileAnalysis: string;
  questionInsights: string;
  personalizedRecommendations: string;
  actionPlan: string;
  strengths: string[];
  improvements: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting LinkedIn audit analysis...');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key is not configured. Please check your configuration.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { profileData, answers, openTextAnswer }: AnalysisRequest = await req.json();

    if (!profileData || !profileData.name) {
      console.error('Invalid request data: missing profile information');
      return new Response(JSON.stringify({ 
        error: 'Invalid request data. Profile information is required.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating professional audit for:', profileData.name);

    // Calculate overall score
    const calculateScore = () => {
      let score = 50;
      
      if (!answers || answers.length === 0) {
        return score;
      }
      
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
          default:
            score += 1;
            break;
        }
      });
      
      return Math.min(Math.max(score, 0), 100);
    };

    const overallScore = calculateScore();
    console.log('Calculated overall score:', overallScore);

    // Professional analysis prompt with JSON response format
    const analysisPrompt = `You are a senior LinkedIn strategist with 15+ years of experience helping executives optimize their personal brands. Analyze the following LinkedIn profile and assessment responses to provide professional, actionable insights.

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

    console.log('Making OpenAI API request...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

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
            content: 'You are a senior LinkedIn strategist. Provide professional, executive-level analysis in valid JSON format. Ensure all JSON strings are properly escaped and the response is valid JSON.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        max_tokens: 1800,
        temperature: 0.3,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${errorText}`);
      
      let errorMessage = 'Failed to generate analysis. ';
      if (response.status === 401) {
        errorMessage += 'Invalid API key configuration.';
      } else if (response.status === 429) {
        errorMessage += 'Rate limit exceeded. Please try again in a few minutes.';
      } else if (response.status === 402) {
        errorMessage += 'Insufficient OpenAI credits.';
      } else {
        errorMessage += `API error (${response.status}). Please try again.`;
      }
      
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      return new Response(JSON.stringify({ 
        error: 'Invalid response from analysis service. Please try again.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawContent = data.choices[0].message.content;
    console.log('OpenAI response received');
    
    let analysisResult: AnalysisResponse;

    try {
      // Try to parse as JSON first
      analysisResult = JSON.parse(rawContent);
    } catch (parseError) {
      console.log('JSON parsing failed, using fallback parsing');
      
      // Fallback to professional defaults with personalized elements
      analysisResult = {
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
    }

    // Validate and ensure all fields are properly formatted
    if (!analysisResult.profileAnalysis || analysisResult.profileAnalysis.length < 50) {
      analysisResult.profileAnalysis = `Your LinkedIn profile demonstrates professional competence but requires strategic optimization to effectively attract ${profileData.targetAudience}. Focus on restructuring your messaging to clearly communicate the specific outcomes you deliver rather than just describing what you do.`;
    }

    if (!analysisResult.strengths || analysisResult.strengths.length === 0) {
      analysisResult.strengths = [
        'Professional background and industry experience',
        'Clear understanding of target market needs',
        'Commitment to LinkedIn optimization',
        'Strategic approach to business development'
      ];
    }

    if (!analysisResult.improvements || analysisResult.improvements.length === 0) {
      analysisResult.improvements = [
        'Enhance headline with outcome-focused messaging',
        'Optimize about section for target audience engagement',
        'Develop strategic content calendar',
        'Implement systematic networking approach'
      ];
    }

    console.log('Analysis completed successfully');

    return new Response(JSON.stringify({
      overallScore,
      profileAnalysis: analysisResult.profileAnalysis,
      questionInsights: analysisResult.questionInsights,
      personalizedRecommendations: analysisResult.personalizedRecommendations,
      actionPlan: analysisResult.actionPlan,
      strengths: analysisResult.strengths.slice(0, 4),
      improvements: analysisResult.improvements.slice(0, 4),
      name: profileData.name,
      email: profileData.email
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in audit function:', error);
    
    let errorMessage = 'Failed to generate audit. ';
    if (error.name === 'AbortError') {
      errorMessage += 'Request timed out. Please try again.';
    } else if (error.message?.includes('fetch')) {
      errorMessage += 'Network error. Please check your connection.';
    } else {
      errorMessage += 'Please try again or contact support if the issue persists.';
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
