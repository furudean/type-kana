<script lang="ts">
  import { hiragana } from "./lib/kana";
  import { randomArrayItem } from "./lib/random";
  import { toRomaji } from "wanakana";

  const dictionary = [
    ...hiragana.monographs,
    ...hiragana.monographDiacritics,
    ...hiragana.digraphs,
    ...hiragana.digraphsDiacritics,
  ];

  let textField: string;

  let randomKana = Array(5)
    .fill(null)
    .map(() => randomArrayItem(dictionary));

  $: currentKana = randomKana[0];

  function handleType() {
    if (textField === toRomaji(currentKana)) {
      textField = "";
      randomKana = randomKana.filter((kana) => kana !== currentKana);
    }
  }
</script>

<style>
  main {
    padding: 1em;
  }
</style>

<main>
  <p>Here is your random kana:</p>
  <ol>
    {#each randomKana as kana}
      <li>{kana}</li>
    {/each}
  </ol>

  <p>{currentKana}</p>

  <input type="text" bind:value={textField} on:input={handleType} />
</main>
