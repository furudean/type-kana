import { derived } from "svelte/store"
import { settings } from "./settings"

export const font = derived(settings, ($settings) => {
	// For non-random fonts, return the selected font directly
	if ($settings.fontFamily !== "random") {
		return $settings.fontFamily
	}
	// For random, we'll let individual components handle the randomness
	// This ensures each component gets its own random font
	return "random"
})
