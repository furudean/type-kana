<script lang="ts">
	import { summary } from "$/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
	import Tooltip from "./_Tooltip.svelte"
	import Button from "$/lib/Button.svelte"
	import { onMount } from "svelte"
	import { celebrate } from "./confetti"
	import { playVictorySound } from "$/lib/sound"

	const answered = $summary.correct.length + $summary.incorrect.length
	const accuracy = $summary.correct.length / answered
	const total = answered + $summary.unquizzed.length

	onMount(() => {
		if ($summary.correct.length > 0) {
			playVictorySound()
			celebrate()
		}
	})
</script>

<svelte:head>
	<title>Summary · Type Kana</title>
</svelte:head>

<Tooltip />

<div class="container content-width content-padding">
	<h1>Session complete 🎉</h1>

	<p>
		{#if accuracy}
			{Math.round(accuracy * 100)}% correct,
		{/if}
		{answered}{answered !== total ? "/" + total : ""}
		answered
	</p>

	{#if $summary.correct.length > 0}
		<section>
			<h2>Correctly answered</h2>
			<SummaryBox items={$summary.correct} truncateAt={50} />
		</section>
	{/if}

	{#if $summary.incorrect.length > 0}
		<section class="incorrect">
			<h2>Needs more practice</h2>
			<SummaryBox
				items={[...$summary.incorrect]
					.sort((a, b) => a.incorrectTimes - b.incorrectTimes)
					.reverse()}
				fill={false}
			/>
		</section>
	{/if}

	{#if $summary.unquizzed.length > 0}
		<section class="unquizzed">
			<h2>Not quizzed</h2>
			<SummaryBox items={$summary.unquizzed} fill={false} truncateAt={20} />
		</section>
	{/if}
	<section>
		<Button href=".">Start over?</Button>
	</section>
</div>

<style lang="postcss">
	.container {
		margin: 0 auto;
	}

	section {
		margin-top: calc(2 * var(--line-space));
	}

	section.unquizzed :global(.summary-item) {
		opacity: 0.5;
		transition: 75ms var(--standard-curve) opacity;

		&:hover,
		&:focus-visible {
			opacity: 1;
		}
	}
</style>
