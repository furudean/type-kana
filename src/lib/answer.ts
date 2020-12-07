import { toHiragana, toRomaji } from "wanakana";

// https://www.tofugu.com/japanese/how-to-type-in-japanese/

// Replacements from `toHiragana`, for conversions that don't work the other 
// way or have multiple valid answers.

// The key here is hiragana, but it works with katakana as well.

export const exceptionalAnswers = new Map([
  ["し", ["shi", "si"]],
  ["ち", ["chi", "ti"]],
  ["つ", ["tsu", "tu"]],
  ["ふ", ["fu", "hu"]],

  ["じ", ["ji", "zi"]],
  ["ぢ", ["di",]],
  ["づ", ["du"]],

  ["じゃ", ["ja", "jya"]],
  ["じゅ", ["ju", "jyu"]],
  ["じょ", ["jo", "jyo"]],
]);

/** Gets acceptable answers for the given kana */
export function getAnswers(kana: string): string[] {
  return exceptionalAnswers.get(toHiragana(kana)) ?? [toRomaji(kana)]
}

/** Checks if input matches a correct answer */
export function isCorrectAnswer(input: string, correctAnswer: string): boolean {
  return getAnswers(correctAnswer).includes(input);
}
