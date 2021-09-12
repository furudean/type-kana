<script lang="ts">
	import Header from "./_header.svelte"
	import Button from "$lib/Button.svelte"
	import Icon from "@/lib/Icon.svelte"
	import { mdiArrowRight } from "@mdi/js"
</script>

<svelte:head>
	<title>Type Kana</title>
</svelte:head>

<Header />
<section class="content-padding">
	<div class="content-width center">
		<p>
			Type Kana is a quiz app to help you learn hiragana and katakana, the
			Japanese syllabaries.
		</p>

		<Button href="/setup">
			Let's begin
			<Icon path={mdiArrowRight} size="1.5em" />
		</Button>
	</div>
</section>

<style lang="postcss">
	* > :global(.button .svg-icon) {
		margin-right: -0.5em;
	}
</style>
