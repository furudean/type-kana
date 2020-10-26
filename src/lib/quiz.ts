import type { GameSettings } from "@/stores/settings"
import { randomArrayItem } from "./random"
import { getDictionary } from "./dictionary"

export interface QuizItem {
  index: number;
  kana: string;
  answer: string;
}

export function quizItem(dictionary: string[], i: number): QuizItem {
  return {
    index: i,
    kana: randomArrayItem(dictionary),
    answer: null,
  }
}

export function getQuiz(opts: GameSettings): QuizItem[] {
  const dictionary = getDictionary(opts);

  return Array(dictionary.length)
    .fill(null)
    .map((_, i) => quizItem(dictionary, i));
}