<script lang="ts">
  import PickerColumn from "../PickerColumn.svelte";
  import { pickerKana } from "@/stores/pickerKana";
  import { kanaType } from "@/stores/kanaType"
  import ViewLink from "../components/ViewLink.svelte";
  import RadioButtons from "../components/RadioButtons.svelte";

  const options = [
    {
      label: "Hiragana",
      value: "hiragana"
    },
    {
      label: "Katakana",
      value: "katakana"
    },
    {
      label: "Both",
      value: "both"
    }
  ]
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

  fieldset {
    border: none;
    padding: 0;
    display: flex;
    margin: 1em 0;
  }

  fieldset > * {
    margin: 0 auto;
  }

  legend {
    font-weight: 500;
    font-size: 1.2em;
  }

  .radio-buttons {
    display: flex;
    margin-top: 1em;
  }
  
  .start-quiz { 
    display: flex;
    justify-content: center;
    padding: 1em 0;
  }
</style>

<section class="pickers">
  <fieldset>
    <legend>I want to practice...</legend>
    <div class="radio-buttons">
      <RadioButtons name="kana-type-radio" {options} bind={kanaType} />
    </div>
  </fieldset>
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
  <section class="start-quiz">
    <ViewLink viewName="quiz">Start quiz</ViewLink>
  </section>
</section>
