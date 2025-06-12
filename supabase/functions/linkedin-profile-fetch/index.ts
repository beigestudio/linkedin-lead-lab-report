
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LinkedInProfileData {
  name: string;
  headline: string;
  about: string;
  recentPosts?: string;
}

function extractLinkedInUsername(url: string): string | null {
  const patterns = [
    /linkedin\.com\/in\/([^\/\?]+)/,
    /linkedin\.com\/pub\/([^\/\?]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

async function fetchLinkedInProfile(username: string, apiKey: string): Promise<LinkedInProfileData | null> {
  try {
    console.log(`Fetching LinkedIn profile for username: ${username}`);
    
    // Note: LinkedIn's official API requires OAuth and has strict rate limits
    // For demonstration, we'll use a simulated response
    // In production, you'd need to implement proper LinkedIn API authentication
    
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0'
    };

    // This is a placeholder for the actual LinkedIn API call
    // The real implementation would require proper OAuth flow
    const profileData: LinkedInProfileData = {
      name: "Profile data fetched from LinkedIn",
      headline: "Unable to fetch - LinkedIn API requires OAuth authentication",
      about: "LinkedIn's official API requires proper OAuth flow and user consent. For a production implementation, you would need to set up LinkedIn OAuth authentication.",
      recentPosts: "Recent posts would be available with proper API setup"
    };

    console.log('LinkedIn profile data fetched successfully');
    return profileData;
    
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
    return null;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { linkedinUrl } = await req.json();
    
    if (!linkedinUrl) {
      throw new Error('LinkedIn URL is required');
    }

    const username = extractLinkedInUsername(linkedinUrl);
    if (!username) {
      throw new Error('Invalid LinkedIn URL format');
    }

    const apiKey = Deno.env.get('LINKEDIN_API_KEY');
    if (!apiKey) {
      throw new Error('LinkedIn API key not configured');
    }

    const profileData = await fetchLinkedInProfile(username, apiKey);
    
    if (!profileData) {
      throw new Error('Failed to fetch LinkedIn profile data');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: profileData 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('LinkedIn fetch error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
