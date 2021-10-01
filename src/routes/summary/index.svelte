<script lang="ts">
	import { summary } from "$/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
	import Tooltip from "./_Tooltip.svelte"
	import Button from "$/lib/Button.svelte"
	import { onMount } from "svelte"
	import { celebrate } from "./confetti"
	import { playVictorySound } from "$/lib/sound"
	import MenuBar from "$lib/MenuBar.svelte"
	import Counters from "./_Counters.svelte"

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

<div class="container content-width content-padding center">
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
			<h2>
				Correctly answered
				<Counters items={$summary.correct} />
			</h2>
			<SummaryBox items={$summary.correct} truncateAt={48} />
		</section>
	{/if}

	{#if $summary.incorrect.length > 0}
		<section class="incorrect">
			<h2>
				Needs more practice
				<Counters items={$summary.incorrect} />
			</h2>
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
			<h2>
				Not quizzed
				<Counters items={$summary.unquizzed} />
			</h2>
			<SummaryBox items={$summary.unquizzed} fill={false} truncateAt={15} />
		</section>
	{/if}
</div>
<MenuBar class="glass-morphism">
	<div class="menu content-width content-padding center">
		<Button href=".">Start over?</Button>
	</div>
</MenuBar>

<style lang="postcss">
	.container {
		padding-bottom: 0;
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

	.menu {
		margin-top: var(--line-space);
		/* padding-top: var(--line-space);
		padding-bottom: var(--line-space); */
		justify-content: center;
	}
</style>
