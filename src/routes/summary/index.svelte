<script>
	import { summary } from "@/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
</script>

<svelte:head>
	<title>Summary · Type Kana</title>
</svelte:head>

<h2>Correct</h2>
{#if $summary.correct}
	<SummaryBox items={$summary.correct} />
{/if}

<h2>Incorrect</h2>
{#if $summary.incorrect}
	<SummaryBox items={$summary.incorrect} />
{/if}

<h2>Unquizzed</h2>
{#if $summary.unquizzed}
	<SummaryBox items={$summary.unquizzed} />
{/if}
