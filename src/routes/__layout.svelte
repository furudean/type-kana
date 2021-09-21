<script lang="ts">
	import { onMount } from "svelte"
	import { resolvedTheme } from "$/stores/theme"
	import { getAudioContext, getRootGain } from "$/lib/audio"
	import { settings } from "$/stores/settings"
	import "$/styles/theme.postcss"
	import "$/styles/global.postcss"
	import "focus-visible"

	onMount(() => {
		const root = document.querySelector(":root")

		root.classList.add("theme-set-by-js")

		resolvedTheme.subscribe((theme) => {
			root.classList.remove("light-theme", "dark-theme")
			root.classList.add(theme + "-theme")
		})

		// set audio volume depending on settings
		settings.subscribe(({ volume }) => {
			getRootGain().gain.value = volume / 100
		})
	})
</script>

<svelte:window
	on:mousedown|once={() => {
		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
		const audioContext = getAudioContext()

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
