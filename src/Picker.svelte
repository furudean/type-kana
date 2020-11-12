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

  function isRowIndeterminate(row: Kana[]): boolean {
    return row.some((item) => item.checked);
  }

  function checkRow(state: boolean) {
    return function (row: Kana[]) {
      return row.map((item) => ({ ...item, checked: state }));
    };
  }

  let rows = hiragana.monographs.map(createKanaRow);
</script>

<style lang="scss">
  input[type="checkbox"] {
    transform: scale(1.5);
    margin: 0 1.5em;
  }
  .row {
    display: flex;
    align-items: center;
  }
  .row-items {
    display: flex;
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
    indeterminate={rows.some(isRowIndeterminate) && !rows.every(isRowChecked)}
    on:click={() => {
      const everyRowChecked = rows.every(isRowChecked);
      rows = rows.map(checkRow(!everyRowChecked));
    }} />
  {#each rows as row}
    <div class="row">
      <input
        type="checkbox"
        checked={isRowChecked(row)}
        indeterminate={isRowIndeterminate(row) && !isRowChecked(row)}
        label="Check entire row"
        on:click={() => {
          const checked = isRowChecked(row);
          row = checkRow(!checked)(row);
        }} />
      <div class="row-items">
        {#each row as rowItem}
          <button
            class="item"
            class:enabled={rowItem.checked}
            on:click={() => {
              rowItem.checked = !rowItem.checked;
            }}>
            {rowItem.kana}
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>
