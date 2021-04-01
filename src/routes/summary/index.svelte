<script>
	import { summary } from "@/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
</script>

<svelte:head>
	<title>Summary · Type Kana</title>
</svelte:head>

{#if $summary.correct.length > 0}
	<h2>Correct</h2>
	<SummaryBox items={$summary.correct} />
{/if}

{#if $summary.incorrect.length > 0}
	<h2>Incorrect</h2>
	<SummaryBox items={$summary.incorrect} />
{/if}

{#if $summary.unquizzed.length > 0}
	<h2>Not quizzed</h2>
	<SummaryBox items={$summary.unquizzed} />
{/if}
