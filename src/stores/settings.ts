import { persistent } from "@furudean/svelte-persistent-store"

export interface GameSettings {
	autoCommit: "forgiving" | "strict" | "disabled"
	theme: "light" | "dark" | "same-as-system"
	showErrorMarker: boolean
	showProgressBar: boolean
	volume: number
	voiceVolume: number
	retryIncorrectAnswers: boolean
	mistakeDelayMs: number
	confetti: boolean
	fontFamily: "Noto Sans JP" | "Hina Mincho" | "random"
}

const DEFAULT_VALUE: GameSettings = {
	autoCommit: "disabled",
	theme: "same-as-system",
	showErrorMarker: false,
	showProgressBar: true,
	volume: 50,
	voiceVolume: 35,
	retryIncorrectAnswers: true,
	mistakeDelayMs: 500,
	confetti: true,
	fontFamily: "Noto Sans JP"
}

export const settings = persistent<GameSettings>({
	key: "game-settings",
	storage_type: "localStorage",
	deserialize: (value) => ({
		...DEFAULT_VALUE,
		...JSON.parse(value)
	}),
	start_value: DEFAULT_VALUE
})
