<script lang="ts">
  import { getAnswers, isCorrectAnswer } from "./lib/answer";

  export let kana: string;
  export let answer: string = null;

  $: hasAnswer = answer !== null;
</script>

<style lang="scss">
  .quiz-item {
    font-size: 5em;
    white-space: nowrap;
    position: relative;
  }

  .furigana {
    font-size: 0.5em;
    font-weight: 500;
    text-align: center;
    display: none;
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

  .incorrect > .furigana {
    display: block;
  }

  .incorrect > .question {
    text-decoration-color: var(--highlight-color);
    text-decoration-style: dotted;
    text-decoration-line: underline;
  }
</style>

<div
  class="quiz-item"
  class:correct={hasAnswer ? isCorrectAnswer(answer, kana) : false}
  class:incorrect={hasAnswer ? !isCorrectAnswer(answer, kana) : false}
  class:answered={hasAnswer}>
  <div class="question">{kana}</div>
  <div class="furigana">{getAnswers(kana)[0]}</div>
</div>
