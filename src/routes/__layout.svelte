<script lang="ts">
	import { browser } from "$app/env"
	import { resolvedTheme } from "$/stores/theme"
	import { getAudioContext, getInterfaceGain, getVoiceGain } from "$/lib/audio"
	import { settings } from "$/stores/settings"
	import "$/styles/theme.postcss"
	import "$/styles/global.postcss"
	import { page } from "$app/stores"
	import "dialog-polyfill/dist/dialog-polyfill.css"

	function setTheme(theme: string) {
		const root = document.querySelector<HTMLHtmlElement>(":root")

		// adds if it doesn't already exist
		root.classList.add("theme-set-by-js")

		root.classList.remove("light-theme", "dark-theme")
		root.classList.add(theme + "-theme")

		// https://web.dev/color-scheme/
		root.style.colorScheme = theme
	}
	// keep active theme in sync with the store
	$: browser && setTheme($resolvedTheme)

	// keep volume in sync with settings
	$: browser && (getInterfaceGain().gain.value = $settings.volume / 100)
	$: browser && (getVoiceGain().gain.value = $settings.voiceVolume / 100)
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

<svelte:head>
	{#if $page.url.pathname !== "/"}
		<!-- prevent sub-pages from being indexed by search engines -->
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<main>
	<slot />
</main>

<style lang="postcss">
	main {
		min-height: 100%;
	}
</style>
