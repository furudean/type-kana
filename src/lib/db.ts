import { toHiragana } from "wanakana";

// https://en.wikipedia.org/wiki/Hiragana#Table_of_hiragana

export const hiragana = {
  monographs: [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "ま", "み", "む", "め", "も",
    "は", "ひ", "ふ", "へ", "ほ",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", "を",
    "ん",
  ],
  monographDiacritics: [
    "が", "ぎ", "ぐ", "げ", "ご",
    "ざ", "じ", "ず", "ぜ", "ぞ",
    "だ", "ぢ", "づ", "で", "ど",
    "ば", "び", "ぶ", "べ", "ぼ",
    "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
  ],
  digraphs: [
    "きゃ", "きゅ", "きょ",
    "しゃ", "しゅ", "しょ",
    "ちゃ", "ちゅ", "ちょ",
    "にゃ", "にゅ", "にょ",
    "ひゃ", "ひゅ", "ひょ",
    "みゃ", "みゅ", "みょ",
    "りゃ", "りゅ", "りょ",
  ],
  digraphsDiacritics: [
    "ぎゃ", "ぎゅ", "ぎょ",
    "じゃ", "じゅ", "じょ",
    "ぢゃ", "ぢゅ", "ぢょ",
    "びゃ", "びゅ", "びょ",
    "ぴゃ", "ぴょ", "ぴょ"
  ]
}

export function isSameKana(a: string, b: string): boolean {
  return toHiragana(a) === toHiragana(b)
}