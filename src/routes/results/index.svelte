<script lang="ts">
  import { summary } from "@/stores/summary";
</script>

<svelte:head>
  <title>Session summary · Type Kana</title>
</svelte:head>

<div class="container">
  <h1>Session summary</h1>
  <pre>
    {JSON.stringify($summary, null, 2)}
  </pre>
</div>

<style lang="scss">
  .container {
    height: 100%;
    background-color: var(--accent-color);
    color: var(--text-color-on-accent-color);
    overflow: hidden;
    padding: 0 2em;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
