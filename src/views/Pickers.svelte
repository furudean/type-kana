<script lang="ts">
  import PickerColumn from "../PickerColumn.svelte";
  import { pickerKana } from "@/stores/pickerKana";
  import { kanaType } from "@/stores/kanaType"
  import ViewLink from "../ViewLink.svelte";
</script>

<style lang="scss">
  .picker-columns {
    display: grid;
    grid-template-areas:
      "a b c"
      "a . d";
    gap: 2em;
    padding-right: 2em;
    justify-content: center;
  }
  .picker-columns > :global(*) {
    &:nth-child(1) {
      grid-area: a;
    }
    &:nth-child(2) {
      grid-area: b;
    }
    &:nth-child(3) {
      grid-area: c;
    }
    &:nth-child(4) {
      grid-area: d;
    }
  }

  @media screen and (max-width: 973px) {
    .picker-columns {
      grid-template-areas:
        "a c"
        "a d"
        "b .";
    }
  }
  @media screen and (max-width: 630px) {
    .picker-columns {
      grid-template-areas:
        "a"
        "b"
        "c"
        "d";
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
    <PickerColumn
      bind:rows={$pickerKana.monographsDiacritics}
      label="Monographs with diacritics" />
    <PickerColumn bind:rows={$pickerKana.digraphs} label="Digraphs" />
    <PickerColumn
      bind:rows={$pickerKana.digraphsDiacritics}
      label="Digraphs with diacritics" />
  </section>
  <ViewLink viewName="quiz">Done</ViewLink>
</section>
