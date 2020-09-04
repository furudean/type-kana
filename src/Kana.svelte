<script lang="ts">
  import { toRomaji } from "wanakana";

  export let kana: string;
  export let answer: string = null;
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
    color: #7f7f7f;
  }

  .incorrect {
    text-decoration: #f76c5e dotted underline;

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
