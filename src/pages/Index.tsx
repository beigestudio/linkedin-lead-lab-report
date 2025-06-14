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
    aboutSection: "",
    recentPosts: ""
  });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [openTextAnswer, setOpenTextAnswer] = useState("");
  const [hyperPersonalizedAnalysis, setHyperPersonalizedAnalysis] = useState<HyperPersonalizedAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { toast } = useToast();

  const generateHyperPersonalizedAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('hyper-personalized-audit', {
        body: {
          profileData,
          answers,
          openTextAnswer
        }
      });

      if (error) {
        throw error;
      }

      setHyperPersonalizedAnalysis(data);
      setCurrentStep(14);
      
    } catch (error) {
      console.error('Hyper-personalized analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
              LinkedIn Profile <span className="text-primary font-medium">Audit</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Transform your personal LinkedIn presence into a client-generating machine with expert guidance
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
        {currentStep === 13 && <LoadingStep />}

        {/* Results Display */}
        {currentStep === 14 && hyperPersonalizedAnalysis && (
          <ResultsDisplay analysis={hyperPersonalizedAnalysis} />
        )}
      </div>
    </div>
  );
};

export default Index;
