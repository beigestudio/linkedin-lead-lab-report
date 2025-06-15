
import { Answer } from './types.ts';

export const calculateScore = (answers: Answer[]): number => {
  let score = 50;
  
  if (!answers || answers.length === 0) {
    return score;
  }
  
  answers.forEach(answer => {
    switch (answer.answer) {
      case 'Daily':
      case 'Yes, crystal clear':
      case 'Highly compelling, results-focused':
      case 'Always hook within 1-2 lines':
      case 'Yes, every post has a strategic CTA':
      case 'Highly targeted, handpicked prospects':
      case 'Daily strategic engagement':
      case 'Yes, regularly booking qualified calls':
      case 'Yes, comprehensive tracking':
        score += 8;
        break;
      case 'Weekly':
      case 'Somewhat clear':
      case 'Somewhat engaging, could be stronger':
      case 'Sometimes hooks work':
      case 'Sometimes, not always':
      case 'Somewhat targeted':
      case 'Weekly engagement':
      case 'Occasionally, but inconsistent':
      case 'Sometimes track basic metrics':
        score += 4;
        break;
      default:
        score += 1;
        break;
    }
  });
  
  return Math.min(Math.max(score, 0), 100);
};
