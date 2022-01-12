<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"

	export const preload = true

	export const load: Load = async ({ fetch }) => {
		const res = await fetch("https://api.github.com/repos/furudean/type-kana")
		const { stargazers_count } = await res.json()
		return {
			props: {
				stargazers: stargazers_count
			}
		}
	}
</script>

<script lang="ts">
	import Header from "./_header.svelte"
	import Button from "$/components/Button.svelte"
	import Icon from "$/components/MaterialIcon.svelte"
	import { mdiArrowRight } from "@mdi/js"

	export let stargazers: number
</script>

<svelte:head>
	<title>Type Kana</title>
</svelte:head>

<Header {stargazers} />
<section class="content-padding">
	<div class="content-width center">
		<p>
			Type Kana is a quiz app to help you learn hiragana and katakana, the
			Japanese syllabaries.
		</p>

		<Button href="/setup">
			Start
			<Icon size="1.25em" path={mdiArrowRight} />
		</Button>
	</div>
</section>

<style lang="postcss">
	* :global(.button .svg-icon) {
		margin-right: -0.5em;
	}
</style>
