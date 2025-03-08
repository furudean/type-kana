import { derived } from "svelte/store"
import { quiz } from "./quiz"
import type { QuizItem } from "./quiz"
import { uniqArray, uniqBy } from "$/lib/util"

export interface SummaryKana {
	kana: string
	answers: string[]
	incorrectTimes: number
	duration: number
}

interface Summary {
	incorrect: SummaryKana[]
	correct: SummaryKana[]
	unquizzed: SummaryKana[]
	duration: number
}

export const summary = derived(quiz, ($quiz): Summary => {
	const uniqQuizzed = uniqBy($quiz.quizzed, (item) => item.kana)

	function createSummaryKana({ kana, isCorrectAnswer }: QuizItem): SummaryKana {
		const dupes = $quiz.quizzed.filter((item) => item.kana === kana)
		return {
			kana,
			answers: uniqArray(dupes.map((item) => item.answered)),
			incorrectTimes: isCorrectAnswer
				? 0
				: dupes.filter((item) => item.isCorrectAnswer === isCorrectAnswer)
						.length,
			duration: dupes.reduce((sum, item) => sum + item.duration, 0)
		}
	}

	return {
		incorrect: uniqQuizzed
			.filter((item) => !item.isCorrectAnswer)
			.map(createSummaryKana),
		correct: uniqQuizzed
			.filter((item) => item.isCorrectAnswer)
			.map(createSummaryKana),
		unquizzed: $quiz.unquizzed.map(createSummaryKana),
		duration: $quiz.duration / 1000
	}
})
