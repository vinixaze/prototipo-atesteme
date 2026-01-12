import type { QuizQuestion } from './types';
import { quizQuestionsPartOneA } from './partOneA';
import { quizQuestionsPartOneB } from './partOneB';
import { quizQuestionsPartTwo } from './partTwo';
import { quizQuestionsPartThree } from './partThree';
import { quizQuestionsPartFour } from './partFour';

export type { QuizQuestion } from './types';

export const quizQuestions: Record<string, QuizQuestion[]> = {
  ...quizQuestionsPartOneA,
  ...quizQuestionsPartOneB,
  ...quizQuestionsPartTwo,
  ...quizQuestionsPartThree,
  ...quizQuestionsPartFour,
};
