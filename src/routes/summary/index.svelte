<script>
	import { summary } from "@/stores/summary"
	import SummaryBox from "./_SummaryBox.svelte"
	import { Tooltip } from "renderless-svelte"
	import { getAnswers } from "@/lib/answer"
</script>

<svelte:head>
	<title>Summary · Type Kana</title>
</svelte:head>

<Tooltip let:options let:dimensions>
	{#if options.type === "summary-item"}
		<div
			class="tooltip"
			style="left: {dimensions.x + dimensions.width / 2}px; top: {dimensions.y +
				dimensions.height +
				5}px;"
		>
			<strong>
				{getAnswers(options.item.kana).join(", ")}
			</strong>
			<br />
			{#if options.item.incorrectTimes > 0}
				<div>
					you wrote: {options.item.answers
						.filter((s) => !getAnswers(options.item.kana).includes(s))
						.map((s) => `"${s}"`)
						.join(", ")}
				</div>
			{/if}
		</div>
	{/if}
</Tooltip>

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
	.tooltip {
		position: absolute;
		background: var(--background-color-inverse);
		color: var(--text-color-inverse);
		padding: 0.3em 0.75em;
		border-radius: var(--standard-border-radius);
		letter-spacing: 1px;
		line-height: 1.25;
		text-align: center;
		font-size: 90%;
		transform: translateX(-50%);
		user-select: none;
		max-width: 10em;
	}

	.tooltip::after {
		content: "";
		position: absolute;
		top: -8px;
		left: 50%;
		border-width: 4px;
		border-style: solid;
		border-color: transparent transparent var(--background-color-inverse)
			transparent;
		transform: translateX(-50%);
	}
</style>
