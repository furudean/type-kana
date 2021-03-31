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

<style lang="scss">
	.quiz-item {
		font-size: 5em;
		white-space: nowrap;
		position: relative;
	}

	.furigana {
		font-size: 0.5em;
		font-weight: 500;
		position: absolute;
		top: -1em;
		left: 0;
		right: 0;
		text-align: center;
	}

	.is-correct {
		color: var(--text-color-lighter);
	}

	.is-incorrect {
		color: var(--text-color-light);
	}

	.is-incorrect > .kana {
		text-decoration-color: var(--highlight-color);
		text-decoration-style: dotted;
		text-decoration-line: underline;
	}
</style>
