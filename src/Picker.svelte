<script lang="ts">
  import { hiragana, katakana } from "@/lib/db";
  import { isHiragana } from "wanakana";
  import { getAnswers } from "./lib/answer";

  interface Kana {
    kana: string;
    checked: boolean;
    type: string;
  }

  function createKanaRow(kana: string[]): Kana[] {
    return kana.map((item) => ({
      kana: item,
      checked: true,
      type: isHiragana(item) ? "hiragana" : "katakana",
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
  $: normalizedResult = rows
    .flat(2)
    .filter((item) => item.checked)
    .map((item) => item.kana);
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
  }
  .item {
    font-size: 2em;
    display: flex;
    color: var(--text-color-light);
    background: transparent;
    border: 3px solid var(--text-color-lighter);
    border-radius: var(--standard-border-radius);
    outline: none;
    margin-left: $grid-margin;
    user-select: none;
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

<div class="picker-grid">
  <div class="row check-column">
    <input
      type="checkbox"
      id="check-column"
      checked={rows.every(isRowChecked)}
      on:click={() => {
        const everyRowChecked = rows.every(isRowChecked);
        rows = rows.map(checkRow(!everyRowChecked));
      }} />
    <label for="check-column">Entire column</label>
  </div>
  {#each rows as row}
    <div class="row">
      <input
        type="checkbox"
        title={isRowChecked(row) ? 'Uncheck entire row' : 'Check entire row'}
        checked={isRowChecked(row)}
        indeterminate={!isRowChecked(row) && row.some((item) => item.checked)}
        on:click={() => {
          const checked = isRowChecked(row);
          row = checkRow(!checked)(row);
        }} />
      <div class="row-items">
        {#each row as item}
          <div
            class="item"
            class:checked={item.checked}
            title={item.type + ' ' + getAnswers(item.kana)[0]}
            on:click={() => {
              item.checked = !item.checked;
            }}>
            <input type="checkbox" style="display: none" />
            {item.kana}
          </div>
        {/each}
      </div>
    </div>
  {/each}
  <p>{normalizedResult.join(', ')}</p>
</div>
