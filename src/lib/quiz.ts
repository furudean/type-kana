import { shuffleArray } from "./random"

export interface QuizItem {
  index: number;
  kana: string;
  answer: string;
}

export function quizItem(kana: string, i: number): QuizItem {
  return {
    index: i,
    kana,
    answer: null,
  }
}

export function getQuiz(dictionary: string[]): QuizItem[] {
  return shuffleArray(dictionary).map(quizItem);
}