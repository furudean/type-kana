import { writable } from "svelte/store"

interface Options<T> {
	/** If `Storage` is empty, this is the value used. */
	start_value: T
	/** Key to save as in `Storage`. */
	key: string
	/** `Storage` object to use. */
	storage_type: "localStorage" | "sessionStorage"
	/** Function used to convert data before saving to `Storage`. Defaults to `JSON.stringify`. */
	serialize?: (value: T) => string
	/** Function used to convert `Storage` to data. Defaults to `JSON.parse`. */
	deserialize?: (value: string) => T
}

const DEFAULT_OPTIONS = Object.freeze({
	serialize: JSON.stringify,
	deserialize: JSON.parse
})

/**
 * Store that saves and loads data from `localStorage` or `sessionStorage`.
 *
 * If the `Storage` interface is updated the store state will stay in sync.
 *
 */
export function persistent<T>(options: Options<T>) {
	const _options: Required<Options<T>> = { ...DEFAULT_OPTIONS, ...options }
	const { key, storage_type, start_value, serialize, deserialize } = _options

	const storage =
		typeof window !== "undefined"
			? (window[storage_type] ?? undefined)
			: undefined

	const store = writable(start_value, function start() {
		function storage_handler(event: StorageEvent) {
			if (event.key === key) sync()
		}

		// bail if storage is missing, this will be the case during server
		// rendering
		if (!storage) return

		sync()

		window.addEventListener("storage", storage_handler)

		return function stop() {
			window.removeEventListener("storage", storage_handler)
		}
	})

	/** Set store value and web storage */
	function set(value: T) {
		store.set(value)
		storage?.setItem(key, serialize(value))
	}

	/** Update store value and web storage */
	function update(updater: (value: T) => T) {
		store.update((current_value) => {
			const new_value = updater(current_value)

			storage?.setItem(key, serialize(new_value))

			return new_value
		})
	}

	/** Reconcile store value with web storage */
	function sync() {
		const stored_data = storage?.getItem(key)

		if (stored_data === null || stored_data === undefined) {
			set(start_value)
		} else {
			// only set store value, otherwise we trigger a double sync
			store.set(deserialize(stored_data))
		}
	}

	return {
		set,
		update,
		subscribe: store.subscribe
	}
}
