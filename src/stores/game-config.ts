import { hiragana } from "$/lib/db"
import { persistent } from "$/lib/persistent-store"

function createKanaCheckbox(kana: string, checked: boolean): KanaCheckbox {
	if (kana) {
		return {
			kana: kana,
			checked: checked
		}
	} else {
		return null
	}
}

function createKanaCheckboxRow(
	kana: string[],
	checked: boolean
): KanaCheckboxRow {
	return kana.map((kana) => createKanaCheckbox(kana, checked))
}

function createKanaCheckboxColumn(
	kanaRows: string[][],
	checked: boolean
): KanaCheckboxColumn {
	return kanaRows.map((row) => createKanaCheckboxRow(row, checked))
}

interface GameConfig {
	kanaType: "hiragana" | "katakana" | "both"
	monographs: KanaCheckboxColumn
	monographsDiacritics: KanaCheckboxColumn
	digraphs: KanaCheckboxColumn
	digraphsDiacritics: KanaCheckboxColumn
}

export const gameConfig = persistent<GameConfig>(
	{
		key: "game-config"
	},
	{
		kanaType: "hiragana",
		monographs: createKanaCheckboxColumn(hiragana.monographs, true),
		monographsDiacritics: createKanaCheckboxColumn(
			hiragana.monographDiacritics,
			true
		),
		digraphs: createKanaCheckboxColumn(hiragana.digraphs, false),
		digraphsDiacritics: createKanaCheckboxColumn(
			hiragana.digraphsDiacritics,
			false
		)
	}
)
