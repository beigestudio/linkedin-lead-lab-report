
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Sparkles, CheckCircle, TrendingUp, Users, ChevronRight, ClipboardList } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
      <CardHeader className="pb-6 sm:pb-8 text-center px-4 sm:px-6">
        <div className="mx-auto mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center backdrop-blur-sm border border-primary/20">
          <Target className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 leading-tight">
          Is Your Personal LinkedIn Profile 
          <span className="block text-primary font-medium">Actually Working?</span>
        </CardTitle>
        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-2">
          Most founders and C-suite executives post on LinkedIn but don't get qualified clients. 
          Let's discover why with a comprehensive, expert-level personal brand audit.
        </p>
      </CardHeader>
      <CardContent className="pt-0 px-4 sm:px-6">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-foreground mb-8 sm:mb-10 backdrop-blur-sm border border-primary/20">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-primary" />
            <h3 className="text-xl sm:text-2xl font-medium">What You'll Discover</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm border border-primary/30">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">Expert Analysis</h4>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Personalized feedback from a strategist who's audited 500+ executive profiles
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm border border-primary/30">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">Actionable Roadmap</h4>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Clear steps to start generating qualified leads from your profile today
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm border border-primary/30">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">Personal Brand Focus</h4>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Strategies for executives to attract high-value prospects through personal branding
              </p>
            </div>
          </div>
        </div>

        {/* Before You Start Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/30">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <ClipboardList className="h-6 w-6 sm:h-7 sm:w-7 mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-blue-100">Before You Start - Have These Ready</h3>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base mb-1">Your LinkedIn Headline</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm leading-relaxed">
                    The text that appears under your name on your profile
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base mb-1">Your About Section</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm leading-relaxed">
                    Your profile summary/bio (the main text in your About section)
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-100/50 dark:bg-blue-900/20 rounded-xl p-4 sm:p-5">
              <p className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm leading-relaxed text-center">
                💡 <strong>Why these?</strong> Our audit specifically analyzes your headline and about section to identify what's attracting (or repelling) your ideal clients.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={onNext} 
            size={isMobile ? "default" : "lg"}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation min-h-[48px]"
          >
            Start My Free LinkedIn Audit
            <ChevronRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
            ✨ Takes 5 minutes • Get hyper-personalized expert feedback
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
