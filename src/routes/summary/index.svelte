<script>
	import { summary } from "@/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
	import Tooltip from "./_Tooltip.svelte"
</script>

<svelte:head>
	<title>Summary · Type Kana</title>
</svelte:head>

<Tooltip />

<div class="container">
	<a href=".">Back to start</a>

	{#if $summary.correct.length > 0}
		<h2>Correct</h2>
		<SummaryBox items={$summary.correct} />
	{/if}

	{#if $summary.incorrect.length > 0}
		<h2>Incorrect</h2>
		<SummaryBox
			items={[...$summary.incorrect]
				.sort((a, b) => a.incorrectTimes - b.incorrectTimes)
				.reverse()}
		/>
	{/if}

	{#if $summary.unquizzed.length > 0}
		<h2>Not quizzed</h2>
		<SummaryBox items={$summary.unquizzed} />
	{/if}
</div>

<style>
	.container {
		padding: 0 1.5em;
	}
</style>
