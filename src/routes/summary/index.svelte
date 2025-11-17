<script lang="ts">
	import { summary } from "$/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
	import Tooltip from "./_Tooltip.svelte"
	import Button from "$/components/Button.svelte"
	import { onMount } from "svelte"
	import { confettiScreen } from "$/lib/confetti"
	import { playVictorySound, playDropSound } from "$/lib/sound"
	import MenuBar from "$/components/MenuBar.svelte"
	import Counters from "./_Counters.svelte"
	import Icon from "$/components/MaterialIcon.svelte"
	import { mdiArrowLeft, mdiRestart, mdiHistory, mdiRefresh } from "@mdi/js"
	import ProgressBar from "$/components/ProgressBar.svelte"
	import { quiz } from "$/stores/quiz"
	import { prettyTime } from "$lib/util"
	import { history } from "$/stores/history"
	import { gameConfig } from "$/stores/game-config"
	import { goto } from "$app/navigation"
	import { dictionary } from "$/stores/dictionary"

	$: correct = $summary.correct
	$: incorrect = $summary.incorrect
	$: unquizzed = $summary.unquizzed
	$: duration = $summary.duration

	$: answered = correct.length + incorrect.length
	$: accuracy = correct.length / answered
	$: total = correct.length + incorrect.length + unquizzed.length

	let sessionSaved = false

	onMount(() => {
		if (correct.length > 0) {
			playVictorySound()
			confettiScreen()
		}

		// Save the session to history (only once)
		if (!sessionSaved && answered > 0) {
			history.addSession({
				timestamp: Date.now(),
				kanaType: $gameConfig.kanaType,
				accuracy: accuracy || 0,
				totalAnswered: answered,
				duration: duration,
				correct: correct.map((item) => item.kana),
				incorrect: incorrect.map((item) => ({
					kana: item.kana,
					incorrectTimes: item.incorrectTimes
				}))
			})
			sessionSaved = true
		}
	})

	function retryIncorrect() {
		playDropSound()
		const incorrectKanas = incorrect.map((item) => item.kana)
		quiz.resetWithKanas(incorrectKanas)
		goto("/session")
	}
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
			<h2>Time to response</h2>
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
				<Button href="/session">
					<Icon path={mdiArrowLeft} size="1.25em" />
					Keep going
				</Button>
			{/if}
			{#if incorrect.length > 0}
				<Button on:click={retryIncorrect} style="outline">
					<Icon path={mdiRefresh} size="1.5em" />
					Retry incorrect
				</Button>
			{/if}
			<Button href="/history" style="outline">
				<Icon path={mdiHistory} size="1.5em" />
				History
			</Button>
			<Button
				href="/setup"
				style={unquizzed.length === 0 && incorrect.length === 0
					? "fill"
					: "outline"}
			>
				<Icon path={mdiArrowLeft} size="1.5em" />
				Main
			</Button>
			{#if answered > 0}
				<Button
					href="/session"
					disabled={$dictionary.length === 0}
					on:click={() => {
						playDropSound()
						quiz.reset()
					}}
					>
					<Icon path={mdiRestart} size="1.5em" />
					Restar quiz
				</Button>
			{/if}
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
