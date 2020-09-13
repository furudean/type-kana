<script lang="ts">
  import { toRomaji } from "wanakana";
  import { isSameKana } from "./lib/db";

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
    text-decoration: #f76c5e dotted underline;
  }
</style>

<div
  class="quiz-item"
  class:correct={hasAnswer ? isSameKana(kana, answer) : false}
  class:incorrect={hasAnswer ? !isSameKana(kana, answer) : false}
  class:answered={hasAnswer}>
  <div class="question">{kana}</div>
  <div class="furigana">{toRomaji(kana)}</div>
</div>
