
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { ProfileData, Answer, AnalysisRequest, AnalysisResponse } from './types.ts';
import { calculateScore } from './scoring.ts';
import { createAnalysisPrompt, createFallbackAnalysis } from './analysis.ts';
import { sendAuditEmail } from './email.ts';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const resendApiKey = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    const overallScore = calculateScore(answers);
    console.log('Calculated overall score:', overallScore);

    const analysisPrompt = createAnalysisPrompt(profileData, answers, openTextAnswer, overallScore);

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
      analysisResult = JSON.parse(rawContent);
    } catch (parseError) {
      console.log('JSON parsing failed, using fallback parsing');
      analysisResult = createFallbackAnalysis(profileData, overallScore);
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

    const finalResult = {
      overallScore,
      profileAnalysis: analysisResult.profileAnalysis,
      questionInsights: analysisResult.questionInsights,
      personalizedRecommendations: analysisResult.personalizedRecommendations,
      actionPlan: analysisResult.actionPlan,
      strengths: analysisResult.strengths.slice(0, 4),
      improvements: analysisResult.improvements.slice(0, 4),
      name: profileData.name,
      email: profileData.email
    };

    // Send email with audit results
    await sendAuditEmail(resendApiKey!, profileData, analysisResult, overallScore);

    return new Response(JSON.stringify(finalResult), {
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
