import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProfileData, Answer, HyperPersonalizedAnalysis } from "@/types/audit";
import { questions } from "@/data/questions";

// Component imports
import { WelcomeStep } from "@/components/audit/WelcomeStep";
import { BasicInfoForm } from "@/components/audit/BasicInfoForm";
import { ProfileContentForm } from "@/components/audit/ProfileContentForm";
import { QuestionStep } from "@/components/audit/QuestionStep";
import { FinalQuestionStep } from "@/components/audit/FinalQuestionStep";
import { LoadingStep } from "@/components/audit/LoadingStep";
import { ResultsDisplay } from "@/components/audit/ResultsDisplay";
import { ProgressBar } from "@/components/audit/ProgressBar";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    whatDoYouDo: "",
    targetAudience: "",
    mainLinkedInGoal: "",
    headline: "",
    aboutSection: ""
  });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [openTextAnswer, setOpenTextAnswer] = useState("");
  const [hyperPersonalizedAnalysis, setHyperPersonalizedAnalysis] = useState<HyperPersonalizedAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  const generateHyperPersonalizedAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      console.log('Starting professional LinkedIn audit for:', profileData.name);
      
      const { data, error } = await supabase.functions.invoke('hyper-personalized-audit', {
        body: {
          profileData,
          answers,
          openTextAnswer
        }
      });

      if (error) {
        console.error('Analysis function error:', error);
        throw new Error(error.message || 'Failed to generate analysis');
      }

      if (!data) {
        throw new Error('No analysis data received');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      console.log('Professional audit completed successfully');
      setHyperPersonalizedAnalysis(data);
      setCurrentStep(14);
      setRetryCount(0);
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      let errorMessage = "Unable to complete analysis. ";
      let variant: "destructive" | "default" = "destructive";
      
      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();
        
        if (errorText.includes('api key')) {
          errorMessage += "Please check your OpenAI API configuration.";
        } else if (errorText.includes('rate limit') || errorText.includes('429')) {
          errorMessage += "Service is temporarily busy. Please try again in a moment.";
          variant = "default";
        } else if (errorText.includes('credits') || errorText.includes('402')) {
          errorMessage += "Service limit reached. Please contact support.";
        } else if (errorText.includes('timeout')) {
          errorMessage += "Request timed out. Please try again.";
          variant = "default";
        } else if (errorText.includes('network')) {
          errorMessage += "Connection issue. Please check your internet connection.";
          variant = "default";
        } else {
          errorMessage += "Please try again or contact support if the issue persists.";
          variant = "default";
        }
      }

      if (retryCount < 2 && variant === "default") {
        errorMessage += ` (Attempt ${retryCount + 1}/3)`;
      }

      toast({
        title: "Analysis Error",
        description: errorMessage,
        variant,
        action: retryCount < 2 && variant === "default" ? (
          <button 
            onClick={handleRetry}
            className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        ) : undefined,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    generateHyperPersonalizedAnalysis();
  };

  const handleAnswer = (questionIndex: number, answer: string) => {
    // Set selected option for visual feedback
    setSelectedOption(answer);
    
    // Safety check to ensure we don't go beyond available questions
    if (questionIndex >= questions.length) {
      console.error('Question index out of bounds:', questionIndex);
      return;
    }

    const question = questions[questionIndex];
    const feedback = question.feedback[answer as keyof typeof question.feedback];
    
    const newAnswer: Answer = {
      question: question.question,
      answer,
      feedback
    };

    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = newAnswer;
    setAnswers(updatedAnswers);

    setTimeout(() => {
      // Clear selected option
      setSelectedOption(null);
      
      // Fixed step navigation logic - properly move to next question
      if (questionIndex < questions.length - 1) {
        // Move to next question (questions start at step 3, so next question is current step + 1)
        setCurrentStep(currentStep + 1);
      } else {
        // All questions answered, move to final question step
        setCurrentStep(12);
      }
    }, 2000);
  };

  const handleFinalSubmit = () => {
    setCurrentStep(13);
    setRetryCount(0); // Reset retry count when starting fresh
    generateHyperPersonalizedAnalysis();
  };

  return (
    <div className="min-h-screen gradient-bg safe-area-top safe-area-bottom">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <img 
                  src="/lovable-uploads/5715d19c-0a4c-40cc-b66b-2e705f807d4e.png" 
                  alt="Logo" 
                  className="h-10 sm:h-12 lg:h-14 w-auto animate-float"
                />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-light text-foreground mb-3 sm:mb-4 tracking-tight px-2">
              Professional LinkedIn <span className="text-primary font-medium">Audit</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Get strategic insights to optimize your LinkedIn presence and accelerate your professional growth
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16 safe-area-bottom">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-6 sm:mb-8">
            <ProgressBar currentStep={currentStep} totalSteps={15} />
          </div>
        )}

        {/* Welcome Step */}
        {currentStep === 0 && (
          <WelcomeStep onNext={() => setCurrentStep(1)} />
        )}

        {/* Step 1: Basic Profile Info */}
        {currentStep === 1 && (
          <BasicInfoForm 
            profileData={profileData}
            onDataChange={setProfileData}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {/* Step 2: Profile Content Collection */}
        {currentStep === 2 && (
          <ProfileContentForm
            profileData={profileData}
            onDataChange={setProfileData}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {/* Questions 1-9 (Steps 3-11) */}
        {currentStep >= 3 && currentStep <= 11 && (
          <QuestionStep
            question={questions[currentStep - 3]}
            questionIndex={currentStep - 3}
            totalQuestions={10}
            answer={answers[currentStep - 3]}
            selectedOption={selectedOption}
            onAnswer={(answer) => handleAnswer(currentStep - 3, answer)}
          />
        )}

        {/* Question 10 - Final Challenge Question */}
        {currentStep === 12 && (
          <FinalQuestionStep
            answer={openTextAnswer}
            onAnswerChange={setOpenTextAnswer}
            onSubmit={handleFinalSubmit}
          />
        )}

        {/* Analysis Loading */}
        {currentStep === 13 && <LoadingStep email={profileData.email} />}

        {/* Results Display */}
        {currentStep === 14 && hyperPersonalizedAnalysis && (
          <ResultsDisplay analysis={hyperPersonalizedAnalysis} />
        )}
      </div>
    </div>
  );
};

export default Index;
