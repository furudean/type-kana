<script lang="ts">
  import { getAnswers } from "./lib/answer";
  import type { KanaCheckbox } from "@/stores/pickerKana";
  import PickerCheckbox from "./PickerCheckbox.svelte";
  import PickerCheckboxSpacer from "./PickerCheckboxSpacer.svelte";
  import { playCheckboxSelectSeriesSound } from "@/lib/sound";

  export let rows: KanaCheckbox[][];
  export let label: string;

  function isRowChecked(row: KanaCheckbox[]): boolean {
    return row.filter((item) => item !== null).every((item) => item.checked);
  }

  function checkRow(state: boolean) {
    return function (row: KanaCheckbox[]) {
      return row.map((item) =>
        item !== null ? { ...item, checked: state } : null
      );
    };
  }
</script>

<section class="picker-column" aria-label={label}>
  <div class="row select-all">
    <label>
      <input
        type="checkbox"
        checked={rows.every(isRowChecked)}
        on:click={() => {
          const everyRowChecked = rows.every(isRowChecked);
          rows = rows.map(checkRow(!everyRowChecked));
          
          playCheckboxSelectSeriesSound(8, !everyRowChecked);
        }}
      />
      <span>Select all</span>
    </label>
  </div>
  {#each rows as row}
    <div
      class="row"
      role="row"
      aria-label={getAnswers(row[0].kana)[0].slice(0, row[0].kana.length) +
        "- sounds"}
    >
      <div class="row-items" role="group" aria-label="select kana in row">
        <input
          type="checkbox"
          title={isRowChecked(row) ? "Deselect row" : "Select row"}
          aria-label="select all"
          checked={isRowChecked(row)}
          indeterminate={!isRowChecked(row) &&
            row.filter((item) => item !== null).some((item) => item.checked)}
          on:click={() => {
            const checked = isRowChecked(row);
            row = checkRow(!checked)(row);

            const validRowItems = row.filter((item) => item);
            playCheckboxSelectSeriesSound(validRowItems.length, !checked);
          }}
        />
        {#each row as item, index}
          {#if item}
            <PickerCheckbox bind:item rowIndex={index} rowLength={row.length} />
          {:else}
            <PickerCheckboxSpacer />
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</section>

<style lang="scss">
  .picker-column {
    display: inline-block;
  }

  input[type="checkbox"] {
    transform: scale(1.5);
    margin: 0 2em;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  .select-all {
    margin-top: 1em;
    margin-bottom: 1em;
    user-select: none;
  }

  .select-all label {
    display: flex;
    flex-direction: row;
  }

  .row {
    display: flex;
    align-items: center;

    &:not(:first-of-type) {
      margin-top: 10px;
    }
  }

  .row-items {
    display: flex;
    align-items: center;
  }
</style>
