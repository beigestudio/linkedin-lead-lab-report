
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  name: string;
  email: string;
  linkedinProfile: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, linkedinProfile }: AnalysisRequest = await req.json();

    console.log('Analyzing LinkedIn profile for:', name);

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
            content: `You are an expert LinkedIn brand strategist who has audited 500+ executive profiles. Provide a detailed, personalized analysis of this LinkedIn profile focusing on personal branding for lead generation. Be specific, actionable, and direct. Focus on what's missing for client acquisition.`
          },
          {
            role: 'user',
            content: `Analyze this LinkedIn profile: ${linkedinProfile}. The user's name is ${name}. Provide expert feedback on their personal brand positioning, content strategy, and lead generation potential. Be specific about what's working and what needs immediate improvement for attracting high-value clients.`
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    console.log('Analysis completed successfully');

    return new Response(JSON.stringify({
      analysis,
      name,
      email,
      linkedinProfile
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-linkedin-profile function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to analyze profile. Please check your LinkedIn URL and try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
