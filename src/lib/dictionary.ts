import type { GameSettings } from "@/stores/settings";
import { hiragana, katakana } from "./db"

export function getDictionary(opts: GameSettings): string[] {
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

  return dictionary;
}
