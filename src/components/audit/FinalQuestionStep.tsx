
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FinalQuestionStepProps {
  answer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
}

export const FinalQuestionStep = ({ answer, onAnswerChange, onSubmit }: FinalQuestionStepProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      toast({
        title: "Please answer the question",
        description: "Help us understand your biggest LinkedIn challenge.",
        variant: "destructive",
      });
      return;
    }
    onSubmit();
  };

  return (
    <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
      <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20">
            Final Question
          </span>
          <div className="text-xs sm:text-sm text-muted-foreground">
            90% Complete
          </div>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 leading-tight">
          What's your biggest LinkedIn challenge right now when it comes to generating qualified leads for your business through your personal profile?
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Describe your main challenge with LinkedIn personal brand lead generation..."
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            className="min-h-32 sm:min-h-40 text-sm sm:text-lg rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:bg-background transition-all resize-none touch-manipulation"
            required
          />
          <Button 
            type="submit"
            className="w-full mt-4 sm:mt-6 h-14 sm:h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation"
          >
            Generate My Hyper-Personalized Audit
            <ChevronRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
