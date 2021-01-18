import { derived } from "svelte/store";
import { toKatakana } from "wanakana";
import { KanaCheckboxColumn, pickerKana } from "./pickerKana";
import { kanaType } from "./kanaType";

function toDictionary(column: KanaCheckboxColumn): string[] {
  return column
    .flat(2)
    .filter((item) => item?.checked)
    .map((item) => item.kana);
}

export const pickedKana = derived(pickerKana, ($kanaColumns) => {
  return [
    ...toDictionary($kanaColumns.monographs),
    ...toDictionary($kanaColumns.monographsDiacritics),
    ...toDictionary($kanaColumns.digraphs),
    ...toDictionary($kanaColumns.digraphsDiacritics),
  ]
});

export const dictionary = derived(
  [pickedKana, kanaType],
  ([$pickedKana, $kanaType]): string[] => {
    let result: string[] = [];

    if ($kanaType === 'hiragana' || $kanaType === 'both') {
      result = [
        ...result,
        ...$pickedKana,
      ];
    }
    if ($kanaType === 'katakana' || $kanaType === 'both') {
      result = [
        ...result,
        ...$pickedKana.map((kana) => toKatakana(kana)),
      ];
    }

    return result;
  })
