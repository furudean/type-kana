import { derived } from "svelte/store"
import type { Readable } from "svelte/store"
import { settings } from "./settings"
import { browser } from "$app/env"

/**
 * Inspiration from
 * https://github.com/DylanVann/perfect-dark-mode/blob/64f6c5c296254ee36f8df36e6a82ed1da7b883f0/packages/perfect-dark-mode/src/createPerfectDarkMode.ts#L98
 */
function createOSThemeStore(): Readable<string> {
	const listeners = new Set<(theme: string) => any>()
	let colorScheme = "light"

	function onChangeMediaQuery(event: MediaQueryListEvent): void {
		colorScheme = event.matches ? "dark" : "light" // assume that "light" is the default
		listeners.forEach((listener) => {
			listener(colorScheme)
		})
	}

	// Only call browser APIs if browser
	if (browser) {
		const mediaQuery = matchMedia("(prefers-color-scheme: dark)")
		colorScheme = mediaQuery.matches ? "dark" : "light"
		mediaQuery.addEventListener("change", onChangeMediaQuery)
	}

	return {
		subscribe(listener) {
			listeners.add(listener)
			listener(colorScheme) // send value to new listener
			return function unsubscribe() {
				listeners.delete(listener)
			}
		}
	}
}

export const osTheme = createOSThemeStore()

export const resolvedTheme = derived(
	[osTheme, settings],
	([$osTheme, $settings]) => {
		return $settings.theme === "same-as-system" ? $osTheme : $settings.theme
	}
)
