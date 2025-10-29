import { shuffleArray } from "$/lib/random"
import type { Readable } from "svelte/store"
import { dictionary as dictionaryStore } from "./dictionary"
import { persistent } from "@furudean/svelte-persistent-store"
import { settings } from "./settings"

export interface QuizItem {
	kana: string
	answered?: string
	incorrectTimes?: number
	isCorrectAnswer?: boolean
	duration?: number
	assignedFont?: string
}

export interface Quiz {
	unquizzed: QuizItem[]
	quizzed: QuizItem[]
}

function assignRandomFont(): string {
	return Math.random() < 0.5 ? "Noto Sans JP" : "Hina Mincho"
}

function createQuizItem(kana: string, fontFamily: string): QuizItem {
	const assignedFont = fontFamily === "random" ? assignRandomFont() : fontFamily

	return { kana, assignedFont }
}

function createQuiz(dictionary: string[], fontFamily: string): Quiz {
	return {
		unquizzed: shuffleArray(dictionary).map((kana) =>
			createQuizItem(kana, fontFamily)
		),
		quizzed: []
	}
}

export interface QuizStore extends Readable<Quiz> {
	insert(index: number, item: QuizItem): void
	pop(callback: (item: QuizItem) => QuizItem): void
	reset(): void
	resetWithKanas(kanas: string[]): void
	updateFonts(): void
}

export function createQuizStore(): QuizStore {
	let dictionary: string[]
	let currentFontFamily: string = "Noto Sans JP"

	// keep dictionary in sync
	// smell: since unsubscribe is never called, this leaks
	dictionaryStore.subscribe((value) => {
		dictionary = value
	})

	// keep font family in sync
	settings.subscribe((value) => {
		currentFontFamily = value.fontFamily
	})

	const { subscribe, set, update } = persistent({
		key: "quiz-session",
		storage_type: "sessionStorage",
		start_value: createQuiz(dictionary, currentFontFamily)
	})

	return {
		subscribe,
		insert(index, item) {
			update(({ unquizzed, ...state }) => {
				const before = unquizzed.slice(0, index)
				const after = unquizzed.slice(index)

				// Ensure the item has an assigned font
				const itemWithFont = item.assignedFont
					? item
					: createQuizItem(item.kana, currentFontFamily)

				return {
					...state,
					unquizzed: [...before, itemWithFont, ...after]
				}
			})
		},
		pop(callback) {
			update(({ unquizzed, quizzed }) => ({
				// remove item from unquizzed
				unquizzed: unquizzed.slice(1),
				// add kana to quizzed array
				quizzed: [...quizzed, callback(unquizzed[0])]
			}))
		},
		reset() {
			set(createQuiz(dictionary, currentFontFamily))
		},
		resetWithKanas(kanas) {
			set({
				unquizzed: shuffleArray(kanas).map((kana) =>
					createQuizItem(kana, currentFontFamily)
				),
				quizzed: []
			})
		},
		updateFonts() {
			update(({ unquizzed, quizzed }) => ({
				unquizzed: unquizzed.map((item) => ({
					...item,
					assignedFont:
						currentFontFamily === "random"
							? assignRandomFont()
							: currentFontFamily
				})),
				quizzed: quizzed.map((item) => ({
					...item,
					assignedFont:
						currentFontFamily === "random"
							? assignRandomFont()
							: currentFontFamily
				}))
			}))
		}
	}
}

export const quiz = createQuizStore()
