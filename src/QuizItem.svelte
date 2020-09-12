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
  }

  rt {
    visibility: hidden;
  }

  .answered {
    color: #ccc;
  }

  .incorrect {
    color: #7f7f7f;
    text-decoration: #f76c5e dotted underline;

    rt {
      visibility: visible;
    }
  }
</style>

<div
  class="quiz-item"
  class:correct={hasAnswer ? isSameKana(kana, answer) : false}
  class:incorrect={hasAnswer ? !isSameKana(kana, answer) : false}
  class:answered={hasAnswer}>
  <ruby>
    {kana}
    <rp>(</rp>
    <rt>{toRomaji(kana)}</rt>
    <rp>)</rp>
  </ruby>
</div>
