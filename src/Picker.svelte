<script lang="ts">
  import { hiragana } from "@/lib/db";

  function row(items: string[]) {
    return items.map((item) => ({
      kana: item,
      checked: true,
    }));
  }

  const rows = hiragana.monographs.map(row);
</script>

<style lang="scss">
  .row {
    display: flex;
    align-items: center;
  }
  .kana {
    font-size: 2em;
    display: flex;
    color: var(--text-color-on-accent-color);
    background: var(--accent-color);
    border: none;

    &.enabled {
      background: orange;
    }
  }
</style>

<div class="picker-grid">
  {#each rows as row}
    <div class="row">
      <input
        type="checkbox"
        checked={row.every((item) => item.checked)}
        on:click={() => {
          row = row.map((item) => ({
            ...item,
            checked: true
          }));
        }} />
      <div class="row-items" />
      {#each row as item}
        <button
          class="kana"
          class:enabled={item.checked}
          on:click={() => {
            item.checked = !item.checked;
          }}>
          {item.kana}
        </button>
      {/each}
    </div>
  {/each}
</div>
