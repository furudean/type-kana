<script lang="ts">
	import { getAnswers } from "@/lib/answer"

	export let kana: string
	export let answered: string = undefined
	export let isCorrectAnswer: boolean = undefined

	$: hasAnswer = answered !== undefined
	$: hasCorrectAnswer = hasAnswer ? isCorrectAnswer : false
	$: hasIncorrectAnswer = hasAnswer ? !isCorrectAnswer : false
</script>

<div
	class="quiz-item"
	class:has-answer={hasAnswer}
	class:is-correct={hasCorrectAnswer}
	class:is-incorrect={hasIncorrectAnswer}
>
	<div class="kana">{kana}</div>
	{#if hasIncorrectAnswer}
		<div class="furigana">{getAnswers(kana)[0]}</div>
	{/if}
</div>

<style lang="postcss">
	.quiz-item {
		font-size: 4em;
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
