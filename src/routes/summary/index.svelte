<script lang="ts">
	import { summary } from "@/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
	import Tooltip from "./_Tooltip.svelte"
	import Button from "@/lib/Button.svelte"
	import confetti from "canvas-confetti"
	import type { Options as ConfettiOptions } from "canvas-confetti"
	import { onMount } from "svelte"

	const answered = $summary.correct.length + $summary.incorrect.length
	const accuracy = $summary.correct.length / answered
	const total = answered + $summary.unquizzed.length
	const particles = 150

	function fire(particleRatio: number, opts: ConfettiOptions) {
		confetti({
			disableForReducedMotion: true,
			origin: { y: 0.4 },
			ticks: 300,
			...opts,
			particleCount: Math.floor(particles * particleRatio)
		})
	}

	onMount(() => {
		fire(0.25, {
			spread: 26,
			startVelocity: 55
		})
		fire(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8
		})
		fire(0.2, {
			spread: 60
		})
		fire(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2
		})
		fire(0.1, {
			spread: 120,
			startVelocity: 45
		})
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
			<SummaryBox items={$summary.correct} />
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
			<SummaryBox items={$summary.unquizzed} fill={false} />
		</section>
	{/if}
	<section>
		<Button href=".">Start over?</Button>
	</section>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
	}

	section {
		margin-top: calc(2 * var(--line-space));
	}

	section.unquizzed {
		opacity: 0.33;
		transition: 120ms var(--standard-curve) opacity;

		&:hover,
		&:focus-within {
			opacity: 1;
		}
	}
</style>
