<script lang="ts">
  import { getAnswers, isCorrectAnswer } from "@/lib/answer";

  export let kana: string;
  export let answer: string = null;

  $: hasAnswer = answer !== null;
  $: hasCorrectAnswer = hasAnswer ? isCorrectAnswer(answer, kana) : false;
  $: hasIncorrectAnswer = hasAnswer ? !isCorrectAnswer(answer, kana) : false;
</script>

<div
  class="quiz-item"
  class:answered={hasAnswer}
  class:correct={hasCorrectAnswer}
  class:incorrect={hasIncorrectAnswer}
>
  <div class="question">{kana}</div>
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

  .correct {
    color: var(--text-color-lighter);
  }

  .incorrect {
    color: var(--text-color-light);
  }

  .incorrect > .question {
    text-decoration-color: var(--highlight-color);
    text-decoration-style: dotted;
    text-decoration-line: underline;
  }
</style>
