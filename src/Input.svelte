<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let text = "";

  function handleSubmit() {
    dispatch("submitKana", {
      text,
    });
    text = "";
  }
</script>

<style>
  input {
    width: 100%;
    text-align: center;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    lang="ja"
    autocapitalize="none"
    autocomplete="off"
    autocorrect="off"
    placeholder="ローマ字入力"
    spellcheck={false}
    bind:value={text} />
  <input type="submit" />
</form>
