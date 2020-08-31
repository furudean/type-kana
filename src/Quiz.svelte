<script lang="ts">
  import Kana from "./Kana.svelte";
  import type { QuizItem } from "./lib/quiz-item";

  export let unquizzed: QuizItem[];
  export let quizzed: QuizItem[];

  $: queue = unquizzed.slice(1);
  $: currentItem = unquizzed[0];
</script>

<style lang="scss">
  .quiz {
    display: flex;
    overflow-x: hidden;
    flex-direction: row-reverse;
  }
  .kana-quizzed,
  .kana-queue {
    display: flex;
    flex-wrap: nowrap;
    flex: 1 1 0;
    width: 0;
  }
  .kana-quizzed {
    flex-direction: row-reverse;
  }

  $margin: 0.25em;

  .kana-queue :global(.kana) {
    margin-left: $margin;

    &:first {
      margin-left: 0;
    }
  }

  .kana-quizzed :global(.kana) {
    margin-right: $margin;
  }
</style>

<div class="quiz">
  <div class="kana-queue">
    {#each queue as { kana, answer }}
      <Kana {kana} {answer} />
    {/each}
  </div>
  <div class="current-kana">
    <Kana kana={currentItem.kana} />
  </div>
  <div class="kana-quizzed">
    {#each [...quizzed.reverse()] as { kana, answer }}
      <Kana {kana} {answer} />
    {/each}
  </div>
</div>
