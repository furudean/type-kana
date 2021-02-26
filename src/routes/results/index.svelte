<script lang="ts">
  import { summary } from "@/stores/summary";
</script>

<svelte:head>
  <title>Session summary · Type Kana</title>
</svelte:head>

<div class="container">
  <h1>Session summary</h1>
  <section class="summary-box">
    {#each $summary.incorrect as item}
      <div class="summary-item">
        {item.kana}
      </div>
    {/each}
  </section>
  <pre>
    {JSON.stringify($summary, null, 2)}
  </pre>
</div>

<style lang="scss">
  .container {
    background-color: var(--accent-color);
    color: var(--text-color-on-accent-color);
    padding: 0 2em;
    overflow: auto;
  }

  .summary-box {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .summary-item {
  }
</style>
