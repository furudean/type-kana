<script lang="ts">
  import { toRomaji } from "wanakana";

  export let kana: string;
  export let answer: string;
</script>

<style lang="scss">
  .kana {
    font-size: 5em;
    white-space: nowrap;
  }

  rt {
    visibility: hidden;
  }

  .correct,
  .incorrect {
    color: #adadad;
  }

  .incorrect {
    text-decoration: red dotted underline;

    rt {
      visibility: visible;
    }
  }
</style>

<div
  class="kana"
  class:correct={answer === 'correct'}
  class:incorrect={answer === 'incorrect'}>
  <ruby>
    {kana}
    <rp>(</rp>
    <rt>{toRomaji(kana)}</rt>
    <rp>)</rp>
  </ruby>
</div>
