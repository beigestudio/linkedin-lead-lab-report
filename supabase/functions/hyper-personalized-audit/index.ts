
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

// Helper function to extract content between markers
const extractSection = (text: string, startMarker: string, endMarker?: string): string => {
  const startIndex = text.toLowerCase().indexOf(startMarker.toLowerCase());
  if (startIndex === -1) return '';
  
  const contentStart = startIndex + startMarker.length;
  let contentEnd = text.length;
  
  if (endMarker) {
    const endIndex = text.toLowerCase().indexOf(endMarker.toLowerCase(), contentStart);
    if (endIndex !== -1) {
      contentEnd = endIndex;
    }
  }
  
  return text.substring(contentStart, contentEnd).trim();
};

// Improved parsing function with multiple strategies
const parseAnalysisResponse = (fullAnalysis: string) => {
  console.log('Full OpenAI response length:', fullAnalysis.length);
  console.log('First 500 characters:', fullAnalysis.substring(0, 500));
  
  let profileAnalysis = '';
  let questionInsights = '';
  let personalizedRecommendations = '';
  let actionPlan = '';
  let strengths: string[] = [];
  let improvements: string[] = [];

  // Strategy 1: Look for numbered sections
  const numberedSections = fullAnalysis.split(/\d+\.\s+/);
  if (numberedSections.length >= 5) {
    console.log('Using numbered sections parsing strategy');
    profileAnalysis = numberedSections[1]?.replace(/^[A-Z\s:]+/i, '').trim() || '';
    questionInsights = numberedSections[2]?.replace(/^[A-Z\s:]+/i, '').trim() || '';
    personalizedRecommendations = numberedSections[3]?.replace(/^[A-Z\s:]+/i, '').trim() || '';
    actionPlan = numberedSections[4]?.replace(/^[A-Z\s:]+/i, '').trim() || '';
  }

  // Strategy 2: Look for specific section headers
  if (!profileAnalysis || profileAnalysis.length < 50) {
    console.log('Using header-based parsing strategy');
    
    const profileMarkers = ['PROFILE ANALYSIS', 'Profile Analysis', '1. PROFILE ANALYSIS'];
    const insightsMarkers = ['QUESTION INSIGHTS', 'Question Insights', '2. QUESTION INSIGHTS'];
    const recommendationsMarkers = ['PERSONALIZED RECOMMENDATIONS', 'Personalized Recommendations', '3. PERSONALIZED RECOMMENDATIONS'];
    const actionMarkers = ['ACTION PLAN', 'Action Plan', '4. ACTION PLAN'];
    
    for (const marker of profileMarkers) {
      const extracted = extractSection(fullAnalysis, marker, insightsMarkers[0]);
      if (extracted && extracted.length > 50) {
        profileAnalysis = extracted.replace(/^[:\-\s]+/, '').trim();
        break;
      }
    }
    
    for (const marker of insightsMarkers) {
      const extracted = extractSection(fullAnalysis, marker, recommendationsMarkers[0]);
      if (extracted && extracted.length > 50) {
        questionInsights = extracted.replace(/^[:\-\s]+/, '').trim();
        break;
      }
    }
    
    for (const marker of recommendationsMarkers) {
      const extracted = extractSection(fullAnalysis, marker, actionMarkers[0]);
      if (extracted && extracted.length > 50) {
        personalizedRecommendations = extracted.replace(/^[:\-\s]+/, '').trim();
        break;
      }
    }
    
    for (const marker of actionMarkers) {
      const extracted = extractSection(fullAnalysis, marker);
      if (extracted && extracted.length > 50) {
        actionPlan = extracted.replace(/^[:\-\s]+/, '').trim();
        break;
      }
    }
  }

  // Strategy 3: Fallback to chunking if sections are still empty
  if (!profileAnalysis || profileAnalysis.length < 50) {
    console.log('Using chunking fallback strategy');
    const chunks = fullAnalysis.split('\n\n').filter(chunk => chunk.trim().length > 100);
    
    if (chunks.length >= 4) {
      profileAnalysis = chunks[0] || '';
      questionInsights = chunks[1] || '';
      personalizedRecommendations = chunks[2] || '';
      actionPlan = chunks[3] || '';
    } else if (chunks.length >= 2) {
      // If we have at least 2 chunks, split them more creatively
      const allText = chunks.join(' ');
      const midPoint = Math.floor(allText.length / 2);
      profileAnalysis = allText.substring(0, midPoint);
      personalizedRecommendations = allText.substring(midPoint);
      questionInsights = 'Based on your responses, several key patterns emerge that indicate both your current approach and areas for strategic improvement.';
      actionPlan = 'Focus on implementing the recommendations above systematically, starting with the highest-impact changes to your profile content and posting strategy.';
    }
  }

  // Extract strengths and improvements
  const strengthsMatch = fullAnalysis.match(/(?:STRENGTHS|Your Strengths)[:\s]*\n?((?:[-•*]\s*.+(?:\n|$))+)/i);
  const improvementsMatch = fullAnalysis.match(/(?:PRIORITY IMPROVEMENTS|Improvements|Areas for Improvement)[:\s]*\n?((?:[-•*]\s*.+(?:\n|$))+)/i);
  
  if (strengthsMatch) {
    strengths = strengthsMatch[1]
      .split(/[-•*]\s*/)
      .filter(s => s.trim())
      .map(s => s.trim().replace(/\n/g, ' '))
      .slice(0, 4);
  }
  
  if (improvementsMatch) {
    improvements = improvementsMatch[1]
      .split(/[-•*]\s*/)
      .filter(s => s.trim())
      .map(s => s.trim().replace(/\n/g, ' '))
      .slice(0, 4);
  }

  // Provide meaningful defaults if extraction failed
  if (strengths.length === 0) {
    strengths = [
      'Clear understanding of your target market and business goals',
      'Professional background that provides credibility in your field',
      'Awareness of the importance of LinkedIn for business growth',
      'Willingness to invest in improving your LinkedIn presence'
    ];
  }

  if (improvements.length === 0) {
    improvements = [
      'Optimize headline to be more client-focused and results-oriented',
      'Restructure about section to speak directly to your target audience',
      'Develop a consistent content strategy that showcases expertise',
      'Implement systematic engagement practices to build relationships'
    ];
  }

  // Ensure all sections have meaningful content
  if (!profileAnalysis || profileAnalysis.length < 50) {
    profileAnalysis = `Based on your current LinkedIn profile, there are significant opportunities to optimize your headline and about section to better attract ${profileData.targetAudience}. Your headline should clearly communicate the value you provide, while your about section needs to be restructured to speak directly to your ideal clients' pain points and desired outcomes.`;
  }

  if (!questionInsights || questionInsights.length < 50) {
    questionInsights = `Your assessment responses reveal both strengths and opportunities in your LinkedIn strategy. The key areas that need immediate attention include content consistency, engagement practices, and conversion optimization to align with your goal of ${profileData.mainLinkedInGoal}.`;
  }

  if (!personalizedRecommendations || personalizedRecommendations.length < 50) {
    personalizedRecommendations = `For your role as ${profileData.whatDoYouDo} targeting ${profileData.targetAudience}, focus on creating content that demonstrates your expertise while addressing their specific challenges. Develop a content calendar that balances educational posts, client success stories, and thought leadership pieces. Your headline should clearly state the transformation you provide, and your about section should follow a problem-solution-proof structure.`;
  }

  if (!actionPlan || actionPlan.length < 50) {
    actionPlan = `Week 1: Rewrite your headline and about section using the recommendations above. Week 2: Create a content calendar with 4-5 post ideas per week. Week 3: Begin systematic engagement with your target audience. Week 4: Launch your new content strategy and track engagement metrics.`;
  }

  console.log('Parsed sections lengths:', {
    profileAnalysis: profileAnalysis.length,
    questionInsights: questionInsights.length,
    personalizedRecommendations: personalizedRecommendations.length,
    actionPlan: actionPlan.length,
    strengths: strengths.length,
    improvements: improvements.length
  });

  return {
    profileAnalysis,
    questionInsights,
    personalizedRecommendations,
    actionPlan,
    strengths,
    improvements
  };
};

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

    // Create detailed analysis prompt with better structure
    const analysisPrompt = `You are an expert LinkedIn brand strategist who has audited 500+ executive profiles. 

PROFILE DATA:
Name: ${profileData.name}
Role: ${profileData.whatDoYouDo}
Target Audience: ${profileData.targetAudience}
LinkedIn Goal: ${profileData.mainLinkedInGoal}
Current Headline: "${profileData.headline}"
Current About Section: "${profileData.aboutSection}"

ASSESSMENT RESPONSES:
${answers.map((answer, index) => `${index + 1}. ${answer.question}\nAnswer: ${answer.answer}`).join('\n\n')}

MAIN CHALLENGE: ${openTextAnswer}

CALCULATED SCORE: ${overallScore}/100

Create a comprehensive, hyper-personalized LinkedIn audit report. Use clear section headers and provide specific, actionable insights:

**1. PROFILE ANALYSIS**
Analyze their actual headline and about section. Be specific about what's working and what needs immediate improvement. Reference their exact content and provide concrete examples of how to improve it.

**2. QUESTION INSIGHTS** 
Analyze patterns in their responses. Identify their biggest strengths and blind spots based on their answers. Connect their responses to specific strategic recommendations.

**3. PERSONALIZED RECOMMENDATIONS**
Provide specific, actionable recommendations tailored to their role (${profileData.whatDoYouDo}), target audience (${profileData.targetAudience}), and goal (${profileData.mainLinkedInGoal}). Include specific examples of improved headlines, content hooks, and CTAs.

**4. ACTION PLAN**
Create a prioritized 30-day implementation plan with specific weekly goals and measurable outcomes.

**STRENGTHS**
- [List 3-4 specific strengths based on their responses]

**PRIORITY IMPROVEMENTS**  
- [List 3-4 critical areas they need to address immediately]

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
            content: 'You are an expert LinkedIn strategist who provides detailed, personalized audits for executives and founders. Be specific, actionable, and direct in your analysis. Always use clear section headers and bullet points for easy parsing.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        max_tokens: 1800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const fullAnalysis = data.choices[0].message.content;

    console.log('OpenAI API call successful, response received');
    
    // Parse the analysis using improved parsing
    const parsedAnalysis = parseAnalysisResponse(fullAnalysis);

    console.log('Hyper-personalized analysis completed successfully');

    return new Response(JSON.stringify({
      overallScore,
      profileAnalysis: parsedAnalysis.profileAnalysis,
      questionInsights: parsedAnalysis.questionInsights,
      personalizedRecommendations: parsedAnalysis.personalizedRecommendations,
      actionPlan: parsedAnalysis.actionPlan,
      strengths: parsedAnalysis.strengths,
      improvements: parsedAnalysis.improvements,
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
