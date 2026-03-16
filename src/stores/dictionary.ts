import { derived } from "svelte/store"
import { toKatakana } from "wanakana"
import { gameConfig } from "./game-config"

function toDictionary(column: KanaCheckboxColumn): string[] {
	return column
		.flat(2)
		.filter((item): item is KanaCheckbox => item?.checked ?? false)
		.map((item) => item.kana)
}

export const selectedKana = derived(gameConfig, ($columns) => {
	return [
		...toDictionary($columns.gojuon),
		...toDictionary($columns.dakuon),
		...toDictionary($columns.yoon),
		...toDictionary($columns.dakuonYoon)
	]
})

export const dictionary = derived(
	[selectedKana, gameConfig],
	([$selectedKana, $gameConfig]): string[] => {
		const { kanaType } = $gameConfig
		const result: string[] = []

		if (kanaType === "hiragana" || kanaType === "both") {
			result.push(...$selectedKana)
		}
		if (kanaType === "katakana" || kanaType === "both") {
			result.push(...$selectedKana.map((kana) => toKatakana(kana)))
		}

		return result
	}
)
