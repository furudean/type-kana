<script lang="ts">
	import Header from "./Header.svelte"
	import Button from "$/components/Button.svelte"
	import Icon from "$/components/MaterialIcon.svelte"
	import { mdiArrowRight } from "@mdi/js"

	interface Props {
		data: { stargazers: number }
	}

	let { data }: Props = $props()
	let stargazers = $derived(data.stargazers)
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
