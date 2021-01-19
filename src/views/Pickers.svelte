<script lang="ts">
  import PickerColumn from "../PickerColumn.svelte";
  import { pickerKana } from "@/stores/pickerKana";
  import { kanaType } from "@/stores/kanaType"
  import RadioButtons from "../components/RadioButtons.svelte";
  import Button from "../components/Button.svelte";
  import { view } from "@/stores/state";
  import Icon from "../components/Icon.svelte";
  import { mdiArrowRight } from "@mdi/js";
  import { dictionary } from "@/stores/dictionary";

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
    justify-content: center;
  }

  legend {
    font-weight: 500;
    font-size: 1.2em;
    text-align: center;
    width: 100%;
  }

  .radio-buttons {
    display: flex;
    margin-top: 1em;
  }

  .radio-buttons > :global(*) {
    margin-left: -3px; // visual offset
  }
  
  .start-quiz { 
    display: flex;
    justify-content: center;
    padding: 3em 0;
  }

  .start-quiz > :global(button) {
    --icon-visual-offset-right: -5px;
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
    <Button on:click={() => { view.set('quiz') }} disabled={$dictionary.length === 0}>
      Start quiz
      <Icon title="Right arrow" path={mdiArrowRight} size="1.5em" />
    </Button>
  </section>
</section>
