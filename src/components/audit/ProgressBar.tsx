
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-6 sm:mb-12">
      <div className="bg-card/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/50">
        <Progress value={progressPercentage} className="h-2 sm:h-3 mb-3 sm:mb-4" />
        <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
          <span>Progress</span>
          <span className="font-medium">Step {Math.min(currentStep, totalSteps)} of {totalSteps}</span>
        </div>
      </div>
    </div>
  );
};
