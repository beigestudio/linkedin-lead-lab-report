
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User, CheckCircle, TrendingUp, Target, Sparkles, Calendar } from "lucide-react";
import { HyperPersonalizedAnalysis } from "@/types/audit";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResultsDisplayProps {
  analysis: HyperPersonalizedAnalysis;
}

export const ResultsDisplay = ({ analysis }: ResultsDisplayProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6 sm:space-y-8">
      <Card className="max-w-6xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
        <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
          <CardTitle className="text-2xl sm:text-4xl font-light mb-2 sm:mb-3 text-center">
            Your Hyper-Personalized <span className="text-primary font-medium">LinkedIn Audit</span>
          </CardTitle>
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-primary/20 to-accent/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm border border-primary/20">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary" />
              <span className="text-xl sm:text-2xl font-bold text-primary">{analysis.overallScore}/100</span>
              <span className="ml-2 text-muted-foreground text-sm sm:text-base">Overall Score</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
          
          {/* Profile Analysis */}
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-border/30">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-primary">
              <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Profile Analysis
            </h3>
            <div className="prose prose-foreground max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
                {analysis.profileAnalysis}
              </div>
            </div>
          </div>

          {/* Strengths & Areas for Improvement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-green-500/20">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Your Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-foreground text-sm sm:text-base">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-orange-500/20">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center text-orange-600">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Priority Improvements
              </h3>
              <ul className="space-y-2">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-foreground text-sm sm:text-base">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Question Insights */}
          <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-blue-500/20">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-blue-600">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Strategic Insights from Your Responses
            </h3>
            <div className="prose prose-foreground max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
                {analysis.questionInsights}
              </div>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-purple-500/20">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-purple-600">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Hyper-Personalized Recommendations
            </h3>
            <div className="prose prose-foreground max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
                {analysis.personalizedRecommendations}
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-gradient-to-br from-primary/15 via-accent/10 to-primary/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-primary/30">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-primary">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Your 30-Day Action Plan
            </h3>
            <div className="prose prose-foreground max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
                {analysis.actionPlan}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="max-w-5xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
        <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
          <CardTitle className="text-2xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 leading-tight">
            Ready to Transform Your LinkedIn Into a 
            <span className="block text-primary font-medium">Client-Generating Machine?</span>
          </CardTitle>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-2">
            Based on your hyper-personalized audit, I can help you implement these strategies and 
            start generating qualified leads within 30 days.
          </p>
        </CardHeader>
        <CardContent className="text-center px-4 sm:px-6">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-foreground mb-8 sm:mb-10 backdrop-blur-sm border border-primary/20">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-primary" />
              <h3 className="text-xl sm:text-3xl font-medium">Complete LinkedIn Transformation</h3>
            </div>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Get 1:1 implementation support, custom content templates, and a proven system 
              that turns your LinkedIn profile into your #1 lead generation channel.
            </p>
          </div>
          
          <div className="mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">Book Your Free <span className="text-primary font-medium">Strategy Call</span></h3>
            <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2">
              Let's discuss your specific LinkedIn challenges and create a custom implementation plan 
              based on your audit results.
            </p>
            <Button 
              size={isMobile ? "default" : "lg"}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-primary hover:from-green-700 hover:to-primary/90 text-white px-8 sm:px-16 py-6 sm:py-8 text-lg sm:text-xl font-medium rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 touch-manipulation min-h-[56px]"
              onClick={() => window.open('https://calendly.com/your-calendar-link', '_blank')}
            >
              <Calendar className="mr-3 sm:mr-4 h-6 w-6 sm:h-7 sm:w-7" />
              Book My Free Strategy Call
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              Free 15-minute consultation
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              Custom strategy based on your audit
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              No-obligation session
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
