<script lang="ts">
  import { hiragana } from "@/lib/db";
  import { getAnswers } from "./lib/answer";

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

  $grid-margin: 4px;

  .row {
    display: flex;
    align-items: center;
    margin-top: $grid-margin;

    &:first-of-type {
      margin-top: 0;
    }
  }
  .row-items {
    display: flex;
  }
  .item {
    font-size: 2em;
    display: flex;
    color: var(--text-color-light);
    background: none;
    border: 2px solid var(--background-contrast-light);
    border-radius: var(--standard-border-radius);
    margin-left: $grid-margin;
    user-select: none;
    line-height: 1;
    padding: 0.2em;
    transition: 125ms var(--standard-transition) color,
      125ms var(--standard-transition) background,
      125ms var(--standard-transition) border-color;

    &.checked {
      color: var(--text-color-on-accent-color);
      background: var(--accent-color);
      border-color: transparent;
    }

    &:first-of-type {
      margin-left: 0;
    }
  }
</style>

<div class="picker-grid">
  <input
    type="checkbox"
    title="Check entire column"
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
        title={isRowChecked(row) ? 'Uncheck entire row' : 'Check entire row'}
        checked={isRowChecked(row)}
        indeterminate={isRowIndeterminate(row) && !isRowChecked(row)}
        on:click={() => {
          const checked = isRowChecked(row);
          row = checkRow(!checked)(row);
        }} />
      <div class="row-items">
        {#each row as rowItem}
          <button
            class="item"
            class:checked={rowItem.checked}
            title={getAnswers(rowItem.kana)[0]}
            aria-checked={rowItem.checked}
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
