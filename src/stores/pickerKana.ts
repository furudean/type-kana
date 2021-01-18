import { writable } from "svelte/store";
import { hiragana } from "@/lib/db";

export interface KanaCheckbox {
  kana: string;
  checked: boolean;
}

function createKanaCheckbox(kana: string, checked: boolean): KanaCheckbox {
  if (kana) {
    return {
      kana: kana,
      checked: checked,
    }
  } else {
    return null;
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
