
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Mail } from "lucide-react";

interface LoadingStepProps {
  email?: string;
}

export const LoadingStep = ({ email }: LoadingStepProps) => {
  return (
    <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
      <CardContent className="text-center py-12 sm:py-16 px-4 sm:px-6">
        <div className="mx-auto mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center backdrop-blur-sm border border-primary/20">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
        </div>
        <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">
          Generating Your <span className="text-primary font-medium">Hyper-Personalized</span> Audit
        </h3>
        <p className="text-muted-foreground text-sm sm:text-lg mb-6 sm:mb-7 px-2">
          Our AI is analyzing your profile content and all your responses to create a comprehensive, personalized audit report...
        </p>
        {/* Notification: Audit will be emailed */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3 sm:gap-4 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-xl px-5 py-3 mb-7 animate-fade-in">
            <Mail className="w-6 h-6 text-primary animate-bounce" />
            <div className="text-left">
              <div className="text-sm sm:text-base text-primary font-medium">
                Your personalized analysis will be sent to your email{email ? (
                  <>
                    :&nbsp;
                    <span className="underline break-all">{email}</span>
                  </>
                ) : null}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                Please check your inbox and spam folder for results.
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              Profile content analyzed
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              Responses processed
            </div>
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
              Generating insights
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
