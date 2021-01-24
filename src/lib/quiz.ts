import { shuffleArray } from "./random"

export interface QuizItem {
  kana: string;
  answer: string;
  incorrectTimes: number;
}

export function quizItem(kana: string): QuizItem {
  return {
    kana,
    answer: null,
    incorrectTimes: 0,
  }
}

export function getQuiz(dictionary: string[]): QuizItem[] {
  return shuffleArray(dictionary).map(quizItem);
}