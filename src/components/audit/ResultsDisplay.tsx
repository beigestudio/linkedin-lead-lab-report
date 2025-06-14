
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User, CheckCircle, TrendingUp, Target, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { HyperPersonalizedAnalysis } from "@/types/audit";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResultsDisplayProps {
  analysis: HyperPersonalizedAnalysis;
}

export const ResultsDisplay = ({ analysis }: ResultsDisplayProps) => {
  const isMobile = useIsMobile();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-700";
    if (score >= 60) return "text-yellow-700";
    return "text-orange-700";
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent Foundation";
    if (score >= 60) return "Good Potential";
    return "Significant Opportunity";
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Score Overview */}
      <Card className="max-w-6xl mx-auto border shadow-xl bg-white">
        <CardHeader className="text-center pb-4 sm:pb-6">
          <CardTitle className="text-2xl sm:text-3xl font-light mb-4 text-gray-800">
            Your LinkedIn Audit Results
          </CardTitle>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center bg-gray-50 border rounded-full px-6 py-3 shadow-md">
              <Star className={`h-6 w-6 mr-2 ${getScoreColor(analysis.overallScore)}`} />
              <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}/100
              </span>
            </div>
            <div className="text-center">
              <div className={`text-lg font-medium ${getScoreColor(analysis.overallScore)}`}>
                {getScoreDescription(analysis.overallScore)}
              </div>
              <div className="text-sm text-gray-600">Current LinkedIn Performance</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Analysis Sections */}
      <div className="grid gap-6 sm:gap-8 max-w-6xl mx-auto">
        
        {/* Profile Analysis */}
        <Card className="border shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold flex items-center text-blue-700">
              <User className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
              Profile Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              {analysis.profileAnalysis}
            </div>
          </CardContent>
        </Card>

        {/* Strengths & Improvements Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border shadow-lg bg-green-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl font-semibold flex items-center text-green-800">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                Current Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-900 leading-relaxed font-medium">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border shadow-lg bg-blue-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl font-semibold flex items-center text-blue-800">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                Priority Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-900 leading-relaxed font-medium">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Insights */}
        <Card className="border shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold flex items-center text-purple-700">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
              Strategic Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              {analysis.questionInsights}
            </div>
          </CardContent>
        </Card>

        {/* Personalized Recommendations */}
        <Card className="border shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold flex items-center text-blue-700">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              {analysis.personalizedRecommendations}
            </div>
          </CardContent>
        </Card>

        {/* 30-Day Action Plan */}
        <Card className="border shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold flex items-center text-orange-700">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
              30-Day Implementation Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              {analysis.actionPlan}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional CTA */}
      <Card className="max-w-5xl mx-auto border shadow-xl bg-white">
        <CardContent className="text-center p-8 sm:p-12">
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-light mb-4 text-gray-800">
              Ready to Implement Your Strategy?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Transform your LinkedIn presence with expert guidance and proven strategies 
              tailored to your specific goals and industry.
            </p>
          </div>
          
          <div className="bg-gray-50 border rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 mr-3 text-blue-600" />
              <h4 className="text-xl font-medium text-gray-800">Professional LinkedIn Strategy Session</h4>
            </div>
            <p className="text-gray-700 mb-6">
              Get personalized implementation support and advanced strategies to accelerate your LinkedIn success.
            </p>
          </div>
          
          <Button 
            size={isMobile ? "default" : "lg"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all group"
            onClick={() => window.open('https://calendly.com/your-calendar-link', '_blank')}
          >
            <Calendar className="mr-3 h-5 w-5" />
            Schedule Strategy Session
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              15-minute consultation
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Personalized strategy discussion
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              No commitment required
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
