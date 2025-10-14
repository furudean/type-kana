<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"

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
	import { mdiArrowRight, mdiHistory } from "@mdi/js"

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

		<div class="buttons">
			<Button href="/setup">
				Start
				<Icon size="1.25em" path={mdiArrowRight} />
			</Button>
			<Button href="/history" style="outline">
				<Icon size="1.25em" path={mdiHistory} />
				History
			</Button>
		</div>
	</div>
</section>

<style lang="postcss">
	.buttons {
		display: flex;
		gap: 1em;
		justify-content: center;
		flex-wrap: wrap;
	}

	* :global(.button .svg-icon) {
		margin-right: -0.5em;
	}
</style>
