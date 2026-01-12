import type { QuizQuestion } from './types';
import { quizQuestionsPartOneA1 } from './partOneA1';
import { quizQuestionsPartOneA2 } from './partOneA2';
import { quizQuestionsPartOneB } from './partOneB';
import { quizQuestionsPartTwo } from './partTwo';
import { quizQuestionsPartThree } from './partThree';
import { quizQuestionsPartFour } from './partFour';

export type { QuizQuestion } from './types';

export const quizQuestions: Record<string, QuizQuestion[]> = {
  ...quizQuestionsPartOneA1,
  ...quizQuestionsPartOneA2,
  ...quizQuestionsPartOneB,
  ...quizQuestionsPartTwo,
  ...quizQuestionsPartThree,
  ...quizQuestionsPartFour,
};
