import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import { browser } from "$app/env"

export interface Options {
	/** Key to save as in storage */
	key: string
	/**
	 * Storage object to use
	 *
	 * @default "localStorage"
	 */
	storageType?: "localStorage" | "sessionStorage"
	/**
	 * Set `startValue`, then assign JSON in storage.
	 *
	 * This is useful when you want to assign new properties alongside old saved
	 * info.
	 *
	 * @default false
	 */
	assign?: boolean
}

const defaultOptions: Partial<Options> = {
	assign: false,
	storageType: "localStorage"
}

// Modified code from: https://svelte.dev/repl/7b4d6b448f8c4ed2b3d5a3c31260be2a?version=3.35.0

const client = browser

export function createPersistentStore<T extends Record<string, any>>(options: Options, startValue: T): Writable<T> {
	const { key, assign, storageType } = { ...defaultOptions, ...options }
	const storage = client && window[storageType]

	/** Set both web storage and store */
	function set(value: T) {
		store.set(value)
		if (client) {
			storage.setItem(key, JSON.stringify(value))
		}
	}

	/** Set both web storage and store */
	function update(updater: (value: T) => T) {
		store.update((current) => {
			const value = updater(current)
			if (client) {
				storage.setItem(key, JSON.stringify(value))
			}
			return value
		})
	}

	/** Synchronize the Svelte store with web storage */
	function sync() {
		const data = storage.getItem(key)

		if (data === null) {
			set(startValue)
		} else {
			store.set({
				...(assign && startValue),
				...JSON.parse(data)
			})
		}
	}

	const store = writable(startValue, () => {
		if (!client) {
			return
		}

		sync()

		function updateFromStorageEvents(event: StorageEvent) {
			if (event.key === key) sync()
		}

		window.addEventListener("storage", updateFromStorageEvents)

		return function unsubscribe() {
			window.removeEventListener("storage", updateFromStorageEvents)
		}
	})

	return {
		set,
		update,
		subscribe: store.subscribe
	}
}
