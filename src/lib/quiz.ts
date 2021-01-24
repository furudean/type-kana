import { shuffleArray } from "./random"

export interface QuizItem {
  kana: string;
  answer: string;
}

export function quizItem(kana: string): QuizItem {
  return {
    kana,
    answer: null,
  }
}

export function getQuiz(dictionary: string[]): QuizItem[] {
  return shuffleArray(dictionary).map(quizItem);
}