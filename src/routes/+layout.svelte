<script lang="ts">
	import { browser } from "$app/environment"
	import { resolvedTheme } from "$/stores/theme"
	import { getAudioContext, getInterfaceGain, getVoiceGain } from "$/lib/audio"
	import { settings } from "$/stores/settings"
	import "$/styles/theme.postcss"
	import "$/styles/global.postcss"
	import "dialog-polyfill/dist/dialog-polyfill.css"
	interface Props {
		children?: import("svelte").Snippet
	}

	let { children }: Props = $props()

	function setTheme(theme: string) {
		const root = document.querySelector<HTMLHtmlElement>(":root")
		if (!root) return

		// adds if it doesn't already exist
		root.classList.add("theme-set-by-js")

		root.classList.remove("light-theme", "dark-theme")
		root.classList.add(theme + "-theme")

		// https://web.dev/color-scheme/
		root.style.colorScheme = theme
	}
	// keep active theme in sync with the store
	$effect(() => {
		if (browser) setTheme($resolvedTheme)
	})

	// keep volume in sync with settings
	$effect(() => {
		if (browser) getInterfaceGain().gain.value = $settings.volume / 100
	})
	$effect(() => {
		if (browser) getVoiceGain().gain.value = $settings.voiceVolume / 100
	})
</script>

<svelte:window
	onmousedown={() => {
		const audioContext = getAudioContext()

		// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
		if (audioContext.state !== "running") {
			audioContext.resume()
		}
	}}
/>

<main>
	{@render children?.()}
</main>

<style lang="postcss">
	main {
		min-height: 100%;
	}
</style>
