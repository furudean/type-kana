<script lang="ts">
  import Kana from "./Kana.svelte";
  import type { QuizItem } from "./lib/quiz-item";

  export let queue: QuizItem[];
  export let quizzed: QuizItem[];
</script>

<style>
  .kana-wrap {
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
</style>

<div class="kana-wrap">
  <div class="kana-queue">
    {#each queue as { kana, answer }}
      <Kana {kana} {answer} />
    {/each}
  </div>
  <div class="kana-quizzed">
    {#each [...quizzed.reverse()] as { kana, answer }}
      <Kana {kana} {answer} />
    {/each}
  </div>
</div>
