<script lang="ts">
  import { hiragana } from "@/lib/db";

  interface Kana {
    kana: string;
    checked: boolean;
  }

  function createKanaRow(kana: string[]): Kana[] {
    return kana.map((item) => ({
      kana: item,
      checked: true,
    }));
  }

  function isRowChecked(row: Kana[]): boolean {
    return row.every((item) => item.checked);
  }

  function checkRow(state: boolean) {
    return function (row: Kana[]) {
      return row.map((item) => ({ ...item, checked: state }));
    };
  }

  let rows = hiragana.monographs.map(createKanaRow);
</script>

<style lang="scss">
  .row {
    display: flex;
    align-items: center;
  }
  .item {
    font-size: 2em;
    display: flex;
    // color: var(--text-color-on-accent-color);
    // background: var(--accent-color);
    background: black;
    color: white;
    border: none;

    &.enabled {
      background: white;
      color: black;
    }
  }
</style>

<div class="picker-grid">
  <input
    type="checkbox"
    checked={rows.every(isRowChecked)}
    on:click={() => {
      const everyRowChecked = rows.every(isRowChecked);
      rows = rows.map(checkRow(!everyRowChecked));
    }} />
  {#each rows as row}
    <div class="row">
      <input
        type="checkbox"
        checked={isRowChecked(row)}
        on:click={() => {
          const checked = isRowChecked(row);
          row = checkRow(!checked)(row);
        }} />
      <div class="row-items" />
      {#each row as item}
        <button
          class="item"
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
