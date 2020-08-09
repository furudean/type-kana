import { randomArrayItem } from "./random"

export interface QuizItem {
  index: number;
  kana: string;
  answer: string;
}

export function quizItem(
  dictionary: string[],
  i: number
): QuizItem {
  return {
    index: i,
    kana: randomArrayItem(dictionary),
    answer: null,
  }
}
