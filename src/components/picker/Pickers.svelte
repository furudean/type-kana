<script lang="ts">
  import { hiragana, katakana } from "@/lib/db";
  import { isHiragana } from "wanakana";
  import type { PickerKana } from "@/components/picker/types";
  import Picker from "./PickerColumn.svelte";

  function createKanaRow(kana: string[]): PickerKana[] {
    return kana.map((item) => ({
      kana: item,
      checked: true,
    }));
  }

  function toDictionary(row: PickerKana[][]) {
    return row
      .flat(2)
      .filter((item) => item.checked)
      .map((item) => item.kana);
  }

  let monographs = hiragana.monographs.map(createKanaRow);
  let monographsDiacritics = hiragana.monographDiacritics.map(createKanaRow);
  let digraphs = hiragana.digraphs.map(createKanaRow);
  let digraphsDiacritics = hiragana.digraphsDiacritics.map(createKanaRow);

  $: dictionary = [
    ...toDictionary(monographs),
    ...toDictionary(monographsDiacritics),
    ...toDictionary(digraphs),
    ...toDictionary(digraphsDiacritics),
  ];
</script>

<style lang="scss">
  .pickers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: 2em;
  }
  :global(.pickers > *) {
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
  <Picker bind:rows={monographs} label="Monographs" />
  <Picker bind:rows={monographsDiacritics} label="Monographs with diacritics" />
  <Picker bind:rows={digraphs} label="Digraphs" />
  <Picker bind:rows={digraphsDiacritics} label="Digraphs with diacritics" />
</section>
<p>[{dictionary.join(', ')}]</p>
<p>length = {dictionary.length}</p>
