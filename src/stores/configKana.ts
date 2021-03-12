import { hiragana } from "@/lib/db";
import { createPersistentStore } from "./persistent";

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

interface ConfigKana {
  monographs: KanaCheckboxColumn;
  monographsDiacritics: KanaCheckboxColumn;
  digraphs: KanaCheckboxColumn;
  digraphsDiacritics: KanaCheckboxColumn;
}

export const configKana = createPersistentStore<ConfigKana>(
  {
    key: 'game-config-kana',
  },
  {
    monographs: createKanaCheckboxColumn(hiragana.monographs, true),
    monographsDiacritics: createKanaCheckboxColumn(hiragana.monographDiacritics, true),
    digraphs: createKanaCheckboxColumn(hiragana.digraphs, false),
    digraphsDiacritics: createKanaCheckboxColumn(hiragana.digraphsDiacritics, false),
  }
);
