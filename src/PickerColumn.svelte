<script lang="ts">
  import { getAnswers } from "./lib/answer";
  import type { KanaCheckbox } from "@/stores/gameConfig";
  import PickerCheckbox from "./PickerCheckbox.svelte";

  export let rows: KanaCheckbox[][];
  export let label: string;

  function isRowChecked(row: KanaCheckbox[]): boolean {
    return row.every((item) => item.checked);
  }

  function checkRow(state: boolean) {
    return function (row: KanaCheckbox[]) {
      return row.map((item) => ({ ...item, checked: state }));
    };
  }
</script>

<style lang="scss">
  .picker-column {
    display: inline-block;
  }

  input[type="checkbox"] {
    transform: scale(1.5);
    margin: 0 1.5em;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  .select-all {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .row {
    display: flex;
    align-items: center;

    &:not(:first-of-type) {
      margin-top: 8px;
    }
  }

  .row-items {
    display: flex;
    align-items: center;
  }
</style>

<section class="picker-column" aria-label={label}>
  <div class="row select-all">
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
          <PickerCheckbox bind:item />
        {/each}
      </div>
    </div>
  {/each}
</section>
