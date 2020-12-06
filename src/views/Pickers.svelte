<script lang="ts">
  import PickerColumn from "../PickerColumn.svelte";
  import { kanaType, pickerKana, dictionary } from "@/stores/gameConfig";
</script>

<style lang="scss">
  .picker-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
    justify-content: center;
  }
  .picker-columns > :global(*) {
    &:nth-child(1) {
      grid-column: 1;
      grid-row: 1 / 3;
    }
    &:nth-child(2) {
      grid-column: 2;
      grid-row: 1;
    }
    &:nth-child(3) {
      grid-column: 3;
      grid-row: 1;
    }
    &:nth-child(4) {
      grid-column: 3;
      grid-row: 2 / 2;
    }
  }
</style>

<section class="pickers">
  <section>
    <fieldset>
      <legend>I want to practice</legend>

      <input
        type="radio"
        id="hiragana-choice"
        name="kana-choice"
        bind:group={$kanaType}
        value="hiragana" />
      <label for="hiragana-choice">Hiragana</label>

      <input
        type="radio"
        id="katakana-choice"
        name="kana-choice"
        bind:group={$kanaType}
        value="katakana" />
      <label for="katakana-choice">Katakana</label>

    <input
      type="radio"
      id="both-choice"
      name="kana-choice"
      bind:group={$kanaType}
      value="both" />
    <label for="both-choice">Both</label>
    </fieldset>
  </section>
  <section class="picker-columns">
    <PickerColumn bind:rows={$pickerKana.monographs} label="Monographs" />
    <PickerColumn bind:rows={$pickerKana.monographsDiacritics} label="Monographs with diacritics" />
    <PickerColumn bind:rows={$pickerKana.digraphs} label="Digraphs" />
    <PickerColumn bind:rows={$pickerKana.digraphsDiacritics} label="Digraphs with diacritics" />
  </section>
  <p>[{$dictionary.join(', ')}]</p>
  <p>length = {$dictionary.length}</p>
</section>
