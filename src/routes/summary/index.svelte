<script>
	import { summary } from "@/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
	import Tooltip from "./_Tooltip.svelte"
	import Button from "@/lib/Button.svelte"
</script>

<svelte:head>
	<title>Summary · Type Kana</title>
</svelte:head>

<Tooltip />

<div class="container">
	<h1>Session complete 🎉</h1>

	{#if $summary.correct.length > 0}
		<section>
			<h2>Nice work</h2>
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
		padding: 0 1.5em;
	}

	section {
		margin-top: 3em;
	}

	section.unquizzed {
		opacity: 0.5;
		transition: 120ms var(--standard-transition) opacity;

		&:hover,
		&:focus-within {
			opacity: 1;
		}
	}
</style>
