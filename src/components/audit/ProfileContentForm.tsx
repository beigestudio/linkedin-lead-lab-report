
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ChevronRight } from "lucide-react";
import { ProfileData } from "@/types/audit";
import { useToast } from "@/hooks/use-toast";

interface ProfileContentFormProps {
  profileData: ProfileData;
  onDataChange: (data: ProfileData) => void;
  onNext: () => void;
}

export const ProfileContentForm = ({ profileData, onDataChange, onNext }: ProfileContentFormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.headline.trim() || !profileData.aboutSection.trim()) {
      toast({
        title: "Missing profile content",
        description: "Please provide your headline and about section.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
      <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
        <div className="mx-auto mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
          <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-light text-foreground mb-2 sm:mb-3">
          Now Let's Analyze Your <span className="text-primary font-medium">Profile Content</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm sm:text-lg">
          Please provide your LinkedIn profile content manually for expert analysis
        </p>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label className="block text-foreground mb-2 sm:mb-3 font-medium text-sm">
              Your Current LinkedIn Headline
            </label>
            <Input
              type="text"
              placeholder="Copy your exact LinkedIn headline here..."
              value={profileData.headline}
              onChange={(e) => onDataChange({ ...profileData, headline: e.target.value })}
              className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              This appears directly under your name on LinkedIn
            </p>
          </div>

          <div>
            <label className="block text-foreground mb-2 sm:mb-3 font-medium text-sm">
              Your Current About Section
            </label>
            <Textarea
              placeholder="Copy your entire LinkedIn About section here..."
              value={profileData.aboutSection}
              onChange={(e) => onDataChange({ ...profileData, aboutSection: e.target.value })}
              className="min-h-32 sm:min-h-40 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all resize-none touch-manipulation"
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              The full summary/about section from your LinkedIn profile
            </p>
          </div>

          <div>
            <label className="block text-foreground mb-2 sm:mb-3 font-medium text-sm">
              Recent Posts (Optional but Recommended)
            </label>
            <Textarea
              placeholder="Copy 1-2 of your recent LinkedIn posts here for content analysis..."
              value={profileData.recentPosts}
              onChange={(e) => onDataChange({ ...profileData, recentPosts: e.target.value })}
              className="min-h-24 sm:min-h-32 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all resize-none touch-manipulation"
            />
            <p className="text-xs text-muted-foreground mt-2">
              This helps us analyze your content style and engagement approach
            </p>
          </div>
          
          <Button 
            type="submit"
            className="w-full h-14 sm:h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation"
          >
            Start Expert Assessment
            <ChevronRight className="ml-2 sm:ml-3 h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
