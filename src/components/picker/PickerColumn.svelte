<script lang="ts">
  import { getAnswers } from "../../lib/answer";
  import type { PickerKana } from "./types";

  export let rows: PickerKana[][];
  export let label: string;

  function isRowChecked(row: PickerKana[]): boolean {
    return row.every((item) => item.checked);
  }

  function checkRow(state: boolean) {
    return function (row: PickerKana[]) {
      return row.map((item) => ({ ...item, checked: state }));
    };
  }
</script>

<style lang="scss">
  $grid-margin: 8px;

  input[type="checkbox"] {
    transform: scale(1.5);
    margin: 0 1.5em;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  .check-column {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .row {
    display: flex;
    align-items: center;

    &:not(:first-of-type) {
      margin-top: $grid-margin;
    }
  }
  .row-items {
    display: flex;
    align-items: center;
  }
  .item {
    appearance: none;
    display: flex;
    font-size: 2em;
    color: var(--text-color-light);
    background: transparent;
    border: 3px solid var(--text-color-lighter);
    border-radius: var(--standard-border-radius);
    outline: none;
    margin-left: $grid-margin;
    cursor: pointer;
    line-height: 1;
    padding: 7px;
    transition: 150ms var(--standard-transition) color,
      150ms var(--standard-transition) background,
      150ms var(--standard-transition) border-color;

    &:first-of-type {
      margin-left: 0;
    }

    &:hover,
    &:focus {
      color: var(--text-color);
      border-color: var(--text-color-light);
    }

    &.checked {
      color: var(--text-color-on-accent-color);
      background: var(--accent-color);
      border-color: transparent;

      &:hover,
      &:focus {
        border-color: var(--border-color-on-accent-color);
      }
    }
  }
</style>

<section class="picker-grid" aria-label={label}>
  <div class="row check-column">
    <label>
      <input
        type="checkbox"
        checked={rows.every(isRowChecked)}
        on:click={() => {
          const everyRowChecked = rows.every(isRowChecked);
          rows = rows.map(checkRow(!everyRowChecked));
        }} />
      Select all
    </label>
  </div>
  {#each rows as row}
    <div
      class="row"
      role="row"
      aria-label={getAnswers(row[0].kana)[0].slice(0, row[0].kana.length) + '- sounds'}>
      <div class="row-items" role="group" aria-label="select kana in row">
        <input
          type="checkbox"
          title={isRowChecked(row) ? 'Deselect row' : 'Select row'}
          aria-label="select all"
          checked={isRowChecked(row)}
          indeterminate={!isRowChecked(row) && row.some((item) => item.checked)}
          on:click={() => {
            const checked = isRowChecked(row);
            row = checkRow(!checked)(row);
          }} />
        {#each row as item}
          <button
            class="item"
            role="checkbox"
            class:checked={item.checked}
            aria-checked={item.checked}
            title={'kana ' + getAnswers(item.kana)[0]}
            aria-label={'kana ' + getAnswers(item.kana)[0]}
            on:click={() => {
              item.checked = !item.checked;
            }}>
            {item.kana}
          </button>
        {/each}
      </div>
    </div>
  {/each}
</section>
