import type { GameSettings } from "@/stores/settings"
import { shuffleArray } from "./random"
import { getDictionary } from "./dictionary"

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

export function getQuiz(opts: GameSettings): QuizItem[] {
  const dictionary = getDictionary(opts);

  const items = shuffleArray(dictionary).map(quizItem);

  return items;
}