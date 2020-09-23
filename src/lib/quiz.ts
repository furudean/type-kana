import { hiragana, katakana } from "./db"
import type { GameSettings } from "./settings"
import { randomArrayItem } from "./random"

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
  let dictionary = [] as string[];

  if (opts.kanaType === 'hiragana' || opts.kanaType === 'both') {
    dictionary = [
      ...dictionary,
      ...hiragana.monographs,
      ...hiragana.monographDiacritics,
      ...hiragana.digraphs,
      ...hiragana.digraphsDiacritics,
    ]
  }

  if (opts.kanaType === 'katakana' || opts.kanaType === 'both') {
    dictionary = [
      ...dictionary,
      ...katakana.monographs,
      ...katakana.monographDiacritics,
      ...katakana.digraphs,
      ...katakana.digraphsDiacritics,
    ]
  }

  return Array(dictionary.length)
    .fill(null)
    .map((_, i) => quizItem(dictionary, i));
}