import { writable, derived } from "svelte/store";
import { hiragana } from "@/lib/db";
import { toKatakana } from "wanakana";

export interface KanaCheckbox {
  kana: string;
  checked: boolean;
}

function createKanaCheckbox(kana: string, checked: boolean): KanaCheckbox {
  return {
    kana: kana,
    checked: checked,
  }
}

export type KanaCheckboxRow = KanaCheckbox[];

function createKanaCheckboxRow(kana: string[], checked: boolean): KanaCheckboxRow {
  return kana.map(kana => createKanaCheckbox(kana, checked));
}

export type KanaCheckboxColumn = KanaCheckboxRow[];

function createKanaCheckboxColumn(kanaRows: string[][], checked: boolean): KanaCheckboxColumn {
  return kanaRows.map(row => createKanaCheckboxRow(row, checked));
}

interface PickerKana {
  monographs: KanaCheckboxColumn;
  monographsDiacritics: KanaCheckboxColumn;
  digraphs: KanaCheckboxColumn;
  digraphsDiacritics: KanaCheckboxColumn;
}

export const pickerKana = writable<PickerKana>({
  monographs: createKanaCheckboxColumn(hiragana.monographs, true),
  monographsDiacritics: createKanaCheckboxColumn(hiragana.monographDiacritics, true),
  digraphs: createKanaCheckboxColumn(hiragana.digraphs, false),
  digraphsDiacritics: createKanaCheckboxColumn(hiragana.digraphsDiacritics, false),

  // overwrite with anything previously saved from local storage
  ...JSON.parse(localStorage.getItem('game-config-kana'))
});

// writes to local storage on update
pickerKana.subscribe(value => {
  localStorage.setItem('game-config-kana', JSON.stringify(value))
});


function toDictionary(column: KanaCheckboxColumn): string[] {
  return column
    .flat(2)
    .filter((item) => item.checked)
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

export type KanaType = 'hiragana' | 'katakana' | 'both';

export const kanaType = writable<KanaType>('hiragana');

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
