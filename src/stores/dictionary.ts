import { derived } from "svelte/store";
import { toKatakana } from "wanakana";
import { KanaCheckboxColumn, configKana } from "./configKana";
import { kanaType } from "./kanaType";

function toDictionary(column: KanaCheckboxColumn): string[] {
  return column
    .flat(2)
    .filter((item) => item?.checked)
    .map((item) => item.kana);
}

export const selectedKana = derived(configKana, ($columns) => {
  return [
    ...toDictionary($columns.monographs),
    ...toDictionary($columns.monographsDiacritics),
    ...toDictionary($columns.digraphs),
    ...toDictionary($columns.digraphsDiacritics),
  ]
});

export const dictionary = derived(
  [selectedKana, kanaType],
  ([$selectedKana, $kanaType]): string[] => {
    let result: string[] = [];

    if ($kanaType === 'hiragana' || $kanaType === 'both') {
      result = [
        ...result,
        ...$selectedKana,
      ];
    }
    if ($kanaType === 'katakana' || $kanaType === 'both') {
      result = [
        ...result,
        ...$selectedKana.map((kana) => toKatakana(kana)),
      ];
    }

    return result;
  })
