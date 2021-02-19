<script lang="ts">
  import PickerColumn from "./_PickerColumn.svelte";
  import { pickerKana } from "@/stores/pickerKana";
  import { kanaType } from "@/stores/kanaType";
  import RadioButtons from "../../components/RadioButtons.svelte";
  import Button from "../../components/Button.svelte";
  import Icon from "../../components/Icon.svelte";
  import { mdiArrowRight } from "@mdi/js";
  import { dictionary } from "@/stores/dictionary";

  const options = [
    {
      label: "Hiragana",
      value: "hiragana",
    },
    {
      label: "Katakana",
      value: "katakana",
    },
    {
      label: "Both",
      value: "both",
    },
  ];
</script>

<svelte:head>
  <title>Setup · Type Kana</title>
</svelte:head>

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
    label="Monographs with diacritics"
  />
  <PickerColumn bind:rows={$pickerKana.digraphs} label="Digraphs" />
  <PickerColumn
    bind:rows={$pickerKana.digraphsDiacritics}
    label="Digraphs with diacritics"
  />
</section>
<section class="start-quiz">
  <Button href="/session" disabled={$dictionary.length === 0}>
    Start quiz
    <Icon title="Right arrow" path={mdiArrowRight} size="1.5em" />
  </Button>
</section>

<style lang="scss">
  .picker-columns {
    display: grid;
    grid-template-areas:
      "a b c"
      "a . d";
    /*  As of writing, 'grid-template-rows: masonry;' is experimental, and only
      renders in firefox with 'layout.css.grid-template-masonry-value.enabled'.
      This gracefully degrades to a slightly worse-looking version on
      unsupported browsers. */
    grid-template-rows: masonry;
    gap: 3em;
    padding: 0 20px;
    justify-content: center;
    margin-top: 3em;
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

  @media screen and (max-width: 978px) {
    .picker-columns {
      grid-template-areas:
        "a c"
        "a d"
        "b .";
    }
  }
  @media screen and (max-width: 638px) {
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
    margin: 0;
    display: flex;
    margin-top: 2em;
    justify-content: center;
  }

  legend {
    padding: 0;
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
    margin-left: -0.4em; // visual offset
  }

  .start-quiz {
    display: flex;
    justify-content: center;
    padding: 2em 0;
  }

  .start-quiz > :global(button) {
    --icon-visual-offset-right: -5px;
  }
</style>
