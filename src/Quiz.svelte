<script lang="ts">
  import QuizItemComponent from "./QuizItem.svelte";
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
    padding: 4em 0;
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

  .kana-queue :global(.quiz-item) {
    margin-left: $margin;

    &:first {
      margin-left: 0;
    }
  }

  .kana-quizzed :global(.quiz-item) {
    margin-right: $margin;
  }
</style>

<section class="quiz">
  <div class="kana-queue">
    {#each [...queue.slice(0, 15)] as { kana, answer }}
      <QuizItemComponent {kana} {answer} />
    {/each}
  </div>
  <div class="current-kana">
    {#if currentItem}
      <QuizItemComponent kana={currentItem.kana} />
    {/if}
  </div>
  <div class="kana-quizzed">
    {#each [...quizzed.reverse().slice(0, 15)] as { kana, answer }}
      <QuizItemComponent {kana} {answer} />
    {/each}
  </div>
</section>
