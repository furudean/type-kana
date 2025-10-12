import { shuffleArray } from "$/lib/random"
import type { Readable } from "svelte/store"
import { dictionary as dictionaryStore } from "./dictionary"
import { persistent } from "@furudean/svelte-persistent-store"

export interface QuizItem {
	kana: string
	answered?: string
	incorrectTimes?: number
	isCorrectAnswer?: boolean
	duration?: number
}

export interface Quiz {
	unquizzed: QuizItem[]
	quizzed: QuizItem[]
}

function createQuiz(dictionary: string[]): Quiz {
	return {
		unquizzed: shuffleArray(dictionary).map((kana) => ({ kana })),
		quizzed: []
	}
}

export interface QuizStore extends Readable<Quiz> {
	insert(index: number, item: QuizItem): void
	pop(callback: (item: QuizItem) => QuizItem): void
	reset(): void
	resetWithKanas(kanas: string[]): void
}

export function createQuizStore(): QuizStore {
	let dictionary: string[]

	// keep dictionary in sync
	// smell: since unsubscribe is never called, this leaks
	dictionaryStore.subscribe((value) => {
		dictionary = value
	})

	const { subscribe, set, update } = persistent({
		key: "quiz-session",
		storage_type: "sessionStorage",
		start_value: createQuiz(dictionary)
	})

	return {
		subscribe,
		insert(index, item) {
			update(({ unquizzed, ...state }) => {
				const before = unquizzed.slice(0, index)
				const after = unquizzed.slice(index)

				return {
					...state,
					unquizzed: [...before, item, ...after]
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
			set(createQuiz(dictionary))
		},
		resetWithKanas(kanas) {
			set({
				unquizzed: shuffleArray(kanas).map((kana) => ({ kana })),
				quizzed: []
			})
		}
	}
}

export const quiz = createQuizStore()
