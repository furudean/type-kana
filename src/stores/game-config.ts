import { hiragana } from "$/lib/db"
import { persistent } from "$/lib/persistent"

function createKanaCheckbox(kana: string | null, checked: boolean): KanaCheckbox | null {
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
	kana: (string | null)[],
	checked: boolean
): KanaCheckboxRow {
	return kana.map((kana) => createKanaCheckbox(kana, checked))
}

function createKanaCheckboxColumn(
	kanaRows: (string | null)[][],
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

export const gameConfig = persistent<GameConfig>({
	key: "game-config",
	storage_type: "sessionStorage",
	start_value: {
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
})
