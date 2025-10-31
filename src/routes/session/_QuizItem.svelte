<script lang="ts">
	import { getAnswers } from "$/lib/answer"
	import { settings } from "$/stores/settings"
	import { onMount } from "svelte"

	export let kana: string
	export let answered: string = undefined
	export let isCorrectAnswer: boolean = undefined
	export let isCurrent = false
	export let element: HTMLDivElement = undefined
	export let assignedFont: string = undefined

	let currentFont = "Noto Sans JP"

	// Use assigned font if available, otherwise fall back to settings
	$: if (assignedFont) {
		currentFont = assignedFont
	} else if ($settings.fontFamily === "random") {
		currentFont = Math.random() < 0.5 ? "Noto Sans JP" : "Hina Mincho"
	} else {
		currentFont = $settings.fontFamily
	}

	$: hasAnswer = answered !== undefined
	$: hasCorrectAnswer = hasAnswer ? isCorrectAnswer : false
	$: hasIncorrectAnswer = hasAnswer ? !isCorrectAnswer : false
</script>

<div
	class="quiz-item"
	class:has-answer={hasAnswer}
	class:is-correct={hasCorrectAnswer}
	class:is-incorrect={hasIncorrectAnswer}
	class:is-current={isCurrent}
	bind:this={element}
	style="font-family: {currentFont}, sans-serif; font-weight: 400;"
>
	<div class="kana" translate="no">{kana}</div>
	{#if hasIncorrectAnswer}
		<div class="furigana" translate="no">{getAnswers(kana)[0]}</div>
	{/if}
</div>

<style lang="postcss">
	.quiz-item {
		font-size: 4em;
		white-space: nowrap;
		line-height: 1.2;
		position: relative;
		margin-top: 0.5em;
	}

	.furigana {
		position: absolute;
		top: -1em;
		left: 0;
		right: 0;
		font-size: 0.5em;
		font-weight: 400;
		line-height: 1;
		text-align: center;
		font-family: "M+ 2c", sans-serif;
	}

	.is-current {
		text-decoration-color: var(--text-color-lighter);
		text-decoration-style: dashed;
		text-decoration-line: underline;
	}

	.is-correct {
		color: var(--text-color-light);
	}

	.is-incorrect {
		color: var(--highlight-color);
	}

	.is-incorrect > .kana {
		text-decoration-color: var(--highlight-color);
		text-decoration-style: dotted;
		text-decoration-line: underline;
	}
</style>
