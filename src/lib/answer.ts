import { toHiragana, toRomaji } from "wanakana";

// https://en.wikipedia.org/wiki/Hiragana#Table_of_hiragana
// alternate ways of writing the same kana
export const exceptionalAnswers = new Map([
  ["し", ["shi", "si"]], // also シ
  ["つ", ["tsu", "tu"]], // also ツ
  ["ぢ", ["di", "ji", "dji", "jyi"]], // also ジ
  ["づ", ["du", "zu", "dzu"]] // also ヂ
]);

/** Gets acceptable answers for the given kana */
export function getAnswers(kana: string): string[] {
  return exceptionalAnswers.get(toHiragana(kana)) ?? [toRomaji(kana)]
}

/** Checks if input matches a correct answer */
export function isCorrectAnswer(input: string, correctAnswer: string): boolean {
  return getAnswers(correctAnswer).includes(input);
}
