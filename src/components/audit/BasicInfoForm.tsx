
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Briefcase, UserCheck, Star, ChevronRight } from "lucide-react";
import { ProfileData } from "@/types/audit";
import { useToast } from "@/hooks/use-toast";

interface BasicInfoFormProps {
  profileData: ProfileData;
  onDataChange: (data: ProfileData) => void;
  onNext: () => void;
}

export const BasicInfoForm = ({ profileData, onDataChange, onNext }: BasicInfoFormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.name || !profileData.email || !profileData.whatDoYouDo || !profileData.targetAudience || !profileData.mainLinkedInGoal) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <Card className="max-w-3xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
      <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
        <div className="mx-auto mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl sm:rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
          <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-light text-foreground mb-2 sm:mb-3">
          Let's Start With Your <span className="text-primary font-medium">Basic Information</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm sm:text-lg">
          This helps us create a personalized audit experience
        </p>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-primary" />
                Your Name
              </label>
              <Input
                type="text"
                placeholder="e.g., Akshara"
                value={profileData.name}
                onChange={(e) => onDataChange({ ...profileData, name: e.target.value })}
                className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                required
              />
            </div>
            
            <div>
              <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                Your Email
              </label>
              <Input
                type="email"
                placeholder="yourname@example.com"
                value={profileData.email}
                onChange={(e) => onDataChange({ ...profileData, email: e.target.value })}
                className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                <Briefcase className="h-4 w-4 mr-2 text-primary" />
                What do you do?
              </label>
              <Input
                type="text"
                placeholder="e.g., Founder of a SaaS startup"
                value={profileData.whatDoYouDo}
                onChange={(e) => onDataChange({ ...profileData, whatDoYouDo: e.target.value })}
                className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                required
              />
            </div>

            <div>
              <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
                <UserCheck className="h-4 w-4 mr-2 text-primary" />
                Target Audience
              </label>
              <Input
                type="text"
                placeholder="e.g., CMOs, founders, coaches"
                value={profileData.targetAudience}
                onChange={(e) => onDataChange({ ...profileData, targetAudience: e.target.value })}
                className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-foreground mb-2 sm:mb-3 font-medium flex items-center text-sm">
              <Star className="h-4 w-4 mr-2 text-primary" />
              Main LinkedIn Goal
            </label>
            <Input
              type="text"
              placeholder="e.g., Generate leads, Build authority"
              value={profileData.mainLinkedInGoal}
              onChange={(e) => onDataChange({ ...profileData, mainLinkedInGoal: e.target.value })}
              className="h-12 sm:h-14 text-sm sm:text-base rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all touch-manipulation"
              required
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full h-14 sm:h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation"
          >
            Continue to Profile Content
            <ChevronRight className="ml-2 sm:ml-3 h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
