import { persistent } from "@furudean/svelte-persistent-store"
import { writable, derived } from "svelte/store"

export interface SessionHistory {
	id: string
	timestamp: number
	kanaType: "hiragana" | "katakana" | "both"
	accuracy: number
	totalAnswered: number
	duration: number
	correct: string[]
	incorrect: Array<{
		kana: string
		incorrectTimes: number
	}>
}

interface HistoryState {
	sessions: SessionHistory[]
}

const MAX_SESSIONS = 50

function createHistoryStore() {
	const { subscribe, set, update } = persistent<HistoryState>({
		key: "quiz-history",
		storage_type: "localStorage",
		start_value: {
			sessions: []
		}
	})

	return {
		subscribe,
		addSession(session: Omit<SessionHistory, "id">) {
			update((state) => {
				const newSession: SessionHistory = {
					...session,
					id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
				}

				const sessions = [newSession, ...state.sessions].slice(0, MAX_SESSIONS)

				return { sessions }
			})
		},
		clear() {
			set({ sessions: [] })
		}
	}
}

export const history = createHistoryStore()

// Derived store para obtener el ranking de letras más difíciles
export const difficultKanas = derived(history, ($history) => {
	const kanaErrors: Record<string, number> = {}

	// Acumular errores de todas las sesiones
	$history.sessions.forEach((session) => {
		session.incorrect.forEach((item) => {
			if (!kanaErrors[item.kana]) {
				kanaErrors[item.kana] = 0
			}
			kanaErrors[item.kana] += item.incorrectTimes
		})
	})

	// Convertir a array y ordenar por cantidad de errores
	return Object.entries(kanaErrors)
		.map(([kana, errors]) => ({ kana, errors }))
		.sort((a, b) => b.errors - a.errors)
})
