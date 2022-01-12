<script lang="ts">
	import { browser } from "$app/env"
	import { resolvedTheme } from "$/stores/theme"
	import { getAudioContext, getRootGain } from "$/lib/audio"
	import { settings } from "$/stores/settings"
	import "$/styles/theme.postcss"
	import "$/styles/global.postcss"
	import "focus-visible"

	function setTheme(theme: string) {
		const root = document.querySelector(":root")

		// adds if it doesn't already exist
		root.classList.add("theme-set-by-js")

		root.classList.remove("light-theme", "dark-theme")
		root.classList.add(theme + "-theme")
	}

	function setVolume(volume: number) {
		getRootGain().gain.value = volume
	}

	// set active theme from settings if it changes
	$: browser && setTheme($resolvedTheme)

	// set audio volume from settings
	$: browser && setVolume($settings.volume / 100)
</script>

<svelte:window
	on:mousedown|once={() => {
		const audioContext = getAudioContext()

		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
		if (audioContext.state !== "running") {
			audioContext.resume()
		}
	}}
/>

<main>
	<slot />
</main>

<style lang="postcss">
	main {
		min-height: 100%;
	}
</style>
