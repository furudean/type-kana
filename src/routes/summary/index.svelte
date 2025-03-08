<script lang="ts">
	import { summary } from "$/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
	import Tooltip from "./_Tooltip.svelte"
	import Button from "$/components/Button.svelte"
	import { onMount } from "svelte"
	import { confettiScreen } from "$/lib/confetti"
	import { playVictorySound } from "$/lib/sound"
	import MenuBar from "$/components/MenuBar.svelte"
	import Counters from "./_Counters.svelte"
	import Icon from "$/components/MaterialIcon.svelte"
	import { mdiArrowLeft, mdiRestart } from "@mdi/js"
	import ProgressBar from "$/components/ProgressBar.svelte"
	import { quiz } from "$/stores/quiz"
	import { prettyTime } from "$lib/util"

	$: correct = $summary.correct
	$: incorrect = $summary.incorrect
	$: unquizzed = $summary.unquizzed
	$: duration = $summary.duration

	$: answered = correct.length + incorrect.length
	$: accuracy = correct.length / answered
	$: total = correct.length + incorrect.length + unquizzed.length

	onMount(() => {
		if (correct.length > 0) {
			playVictorySound()
			confettiScreen()
		}
	})
</script>

<svelte:head>
	<title>Summary · Type Kana</title>
</svelte:head>

<Tooltip />
<ProgressBar />

<div class="main content-width content-padding center">
	<h1>Session complete 🎉</h1>

	<p>
		{#if accuracy}
			{Math.round(accuracy * 100)}% correct,
		{/if}
		{answered}{answered !== total ? "/" + total : ""}
		answered,
		{#if duration}
			{prettyTime(duration)}
		{/if}
	</p>

	{#if correct.length > 0}
		<section>
			<h2>
				Correct answer
				<Counters items={correct} />
			</h2>
			<SummaryBox items={correct} truncateAt={48} />
		</section>
	{/if}

	{#if incorrect.length > 0}
		<section class="incorrect">
			<h2>
				Wrong answer
				<Counters items={incorrect} />
			</h2>
			<SummaryBox
				items={[...incorrect]
					.sort((a, b) => a.incorrectTimes - b.incorrectTimes)
					.reverse()}
				fill={false}
			/>
		</section>
	{/if}

	{#if unquizzed.length > 0}
		<section class="unquizzed">
			<h2>
				Unfinished
				<Counters items={unquizzed} />
			</h2>
			<SummaryBox items={unquizzed} fill={false} truncateAt={15} />
		</section>
	{/if}

	{#if [...correct, ...incorrect].length > 0}
		<section>
			<h2>Kana times</h2>
			<SummaryBox
				time
				items={[...correct, ...incorrect].sort(
					(a, b) => b.duration - a.duration
				)}
				truncateAt={10}
			/>
		</section>
	{/if}
</div>

<MenuBar class="glass-morphism">
	<div class="menu content-width content-padding center">
		{#if unquizzed.length > 0}
			<p>
				There {unquizzed.length === 1 ? "is" : "are"}
				{unquizzed.length} left to quiz. Finish up?
			</p>
		{/if}
		<div class="menu-items">
			{#if unquizzed.length > 0}
				<Button href="/session" on:click={() => quiz.refreshTime()}>
					<Icon path={mdiArrowLeft} size="1.25em" />
					Keep going
				</Button>
			{/if}
			<Button href="/setup" style={unquizzed.length === 0 ? "fill" : "outline"}>
				<Icon path={mdiRestart} size="1.5em" />
				Start over
			</Button>
		</div>
	</div>
</MenuBar>

<style lang="postcss">
	.main {
		padding-bottom: 0;
		margin-bottom: var(--line-space);
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

	.menu p {
		line-height: 1;
		margin: 0;
		margin-bottom: calc(0.75 * var(--line-space));
	}

	.menu-items {
		display: flex;
		gap: 1em;

		> :global(.button .svg-icon) {
			margin-left: -0.5em;
		}
	}
</style>
