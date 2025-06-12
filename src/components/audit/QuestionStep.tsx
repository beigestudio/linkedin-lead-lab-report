
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Question, Answer } from "@/types/audit";

interface QuestionStepProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  answer: Answer | undefined;
  selectedOption?: string | null;
  onAnswer: (answer: string) => void;
}

export const QuestionStep = ({ question, questionIndex, totalQuestions, answer, selectedOption, onAnswer }: QuestionStepProps) => {
  return (
    <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-card/80 backdrop-blur-sm border border-border/30">
      <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {Math.round(((questionIndex + 1) / totalQuestions) * 100)}% Complete
          </div>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 leading-tight">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option;
            return (
              <Button
                key={index}
                variant="outline"
                className={`w-full h-auto p-4 sm:p-6 text-left justify-start text-sm sm:text-lg hover:bg-primary/5 hover:border-primary/30 transition-all rounded-xl border-border/50 bg-background/30 backdrop-blur-sm touch-manipulation min-h-[56px] ${
                  isSelected ? 'bg-primary/10 border-primary/50 ring-2 ring-primary/20' : ''
                }`}
                onClick={() => onAnswer(option)}
                disabled={!!selectedOption}
              >
                <div className="flex items-center w-full">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 text-xs sm:text-sm font-medium text-primary border border-primary/20 flex-shrink-0 ${
                    isSelected ? 'bg-primary text-primary-foreground border-primary' : ''
                  }`}>
                    {isSelected ? <CheckCircle className="h-4 w-4" /> : String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-left leading-relaxed">{option}</span>
                </div>
              </Button>
            );
          })}
        </div>
        
        {answer && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-xl sm:rounded-2xl border border-primary/20 backdrop-blur-sm">
            <h4 className="font-semibold text-primary mb-2 sm:mb-3 flex items-center text-base sm:text-lg">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Expert Feedback
            </h4>
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              {answer.feedback}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
