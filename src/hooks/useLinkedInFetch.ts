
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LinkedInProfileData {
  name: string;
  headline: string;
  about: string;
  recentPosts?: string;
}

export const useLinkedInFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchLinkedInProfile = async (linkedinUrl: string): Promise<LinkedInProfileData | null> => {
    if (!linkedinUrl.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid LinkedIn profile URL",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('linkedin-profile-fetch', {
        body: { linkedinUrl }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch LinkedIn profile');
      }

      toast({
        title: "Profile fetched successfully",
        description: "LinkedIn profile data has been imported",
      });

      return data.data;

    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
      toast({
        title: "Fetch failed",
        description: error.message || "Unable to fetch LinkedIn profile. Please enter the information manually.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchLinkedInProfile,
    isLoading
  };
};
