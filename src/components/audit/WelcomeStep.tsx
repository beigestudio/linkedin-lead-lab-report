
import { useState, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Target, Sparkles, CheckCircle, TrendingUp, Users, ChevronRight, ClipboardList } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WelcomeStepProps {
  onNext: () => void;
}

const PreparationItem = memo(({ number, title, description }: { 
  number: string; 
  title: string; 
  description: string; 
}) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
      <span className="text-primary font-semibold text-base">{number}</span>
    </div>
    <div>
      <h4 className="font-semibold text-foreground text-base mb-1">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  </div>
));

const FeatureCard = memo(({ icon: Icon, title, description }: {
  icon: typeof CheckCircle;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div className="bg-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm border border-primary/30">
      <Icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary" />
    </div>
    <h4 className="font-semibold mb-2 text-foreground text-sm sm:text-base">{title}</h4>
    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{description}</p>
  </div>
));

export const WelcomeStep = memo(({ onNext }: WelcomeStepProps) => {
  const isMobile = useIsMobile();
  const [isPreparationModalOpen, setIsPreparationModalOpen] = useState(true);

  const handleReadyToProceed = useCallback(() => {
    setIsPreparationModalOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  return (
    <>
      {/* Preparation Modal - Optimized for mobile */}
      <Dialog open={isPreparationModalOpen} onOpenChange={() => {}}>
        <DialogContent 
          className="max-w-2xl max-h-[90vh] overflow-y-auto touch-manipulation" 
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <ClipboardList className="h-7 w-7 mr-3 text-primary" />
              <DialogTitle className="text-xl sm:text-2xl font-semibold text-foreground text-center">
                Before You Start - Have These Ready
              </DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 px-2">
            <div className="grid grid-cols-1 gap-6">
              <PreparationItem
                number="1"
                title="Your LinkedIn Headline"
                description="The text that appears under your name on your profile"
              />
              <PreparationItem
                number="2"
                title="Your About Section"
                description="Your profile summary/bio (the main text in your About section)"
              />
            </div>
            
            <div className="bg-primary/10 rounded-xl p-4 sm:p-5">
              <p className="text-foreground text-sm leading-relaxed text-center">
                💡 <strong>Why these?</strong> Our audit specifically analyzes your headline and about section to identify what's attracting (or repelling) your ideal clients.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6 sm:mt-8">
            <Button 
              onClick={handleReadyToProceed}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-6 sm:px-8 py-4 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation min-h-[48px]"
            >
              I'm Ready - Let's Start!
              <ChevronRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Welcome Content - Optimized layout */}
      <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
        <CardHeader className="pb-6 sm:pb-8 text-center px-4 sm:px-6">
          <div className="mx-auto mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center backdrop-blur-sm border border-primary/20">
            <Target className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          </div>
          
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-4 sm:mb-6 leading-tight">
            Is Your Personal LinkedIn Profile 
            <span className="block text-primary font-medium mt-2">Actually Working?</span>
          </CardTitle>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-2">
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
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                icon={CheckCircle}
                title="Expert Analysis"
                description="Personalized feedback from a strategist who's audited 500+ executive profiles"
              />
              <FeatureCard
                icon={TrendingUp}
                title="Actionable Roadmap"
                description="Clear steps to start generating qualified leads from your profile today"
              />
              <FeatureCard
                icon={Users}
                title="Personal Brand Focus"
                description="Strategies for executives to attract high-value prospects through personal branding"
              />
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleNext} 
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
    </>
  );
});

WelcomeStep.displayName = "WelcomeStep";
