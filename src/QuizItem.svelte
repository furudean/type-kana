<script lang="ts">
  import { toRomaji } from "wanakana";
  import { isCorrectAnswer } from "./lib/answer";

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
    text-align: center;
    display: none;
    position: absolute;
    top: -1em;
    left: 50%;
    transform: translateX(-50%);
  }

  .correct {
    color: #ccc;
  }

  .incorrect {
    color: #7f7f7f;
  }

  .incorrect > .furigana {
    display: block;
  }

  .incorrect > .question {
    text-decoration-color: #f76c5e;
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
  <div class="furigana">{toRomaji(kana)}</div>
</div>
