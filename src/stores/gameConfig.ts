import { writable, derived } from "svelte/store";
import { hiragana } from "@/lib/db";
import { toKatakana } from "wanakana";

export type KanaType = 'hiragana' | 'katakana' | 'both';
export const kanaType = writable<KanaType>('hiragana');

export interface KanaCheckbox {
  kana: string;
  checked: boolean;
}
function createPickerKana(kana: string, checked: boolean): KanaCheckbox {
  return {
    kana: kana,
    checked: checked,
  }
}
function createPickerRows(kana: string[], checked: boolean): KanaCheckbox[] {
  return kana.map(kana => createPickerKana(kana, checked));
}
function createPickerColumn(kanaRows: string[][], checked: boolean): KanaCheckbox[][] {
  return kanaRows.map(row => createPickerRows(row, checked));
}

export const kanaColumns = writable({
  monographs: createPickerColumn(hiragana.monographs, true),
  monographsDiacritics: createPickerColumn(hiragana.monographDiacritics, true),
  digraphs: createPickerColumn(hiragana.digraphs, false),
  digraphsDiacritics: createPickerColumn(hiragana.digraphsDiacritics, false),
});

function toDictionary(row: KanaCheckbox[][]): string[] {
  return row
    .flat(2)
    .filter((item) => item.checked)
    .map((item) => item.kana);
}
export const pickedKana = derived(kanaColumns, ($kanaColumns) => {
  return [
    ...toDictionary($kanaColumns.monographs),
    ...toDictionary($kanaColumns.monographsDiacritics),
    ...toDictionary($kanaColumns.digraphs),
    ...toDictionary($kanaColumns.digraphsDiacritics),
  ]
});

export const dictionary = derived([pickedKana, kanaType], ([$pickedKana, $kanaType]) => {
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
