<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { mdiChevronRight } from "@mdi/js"
  import Icon from "./Icon.svelte";
  import { settings } from "@/stores/settings";
  import { getAnswers, isCorrectAnswer } from "@/lib/answer";

  export let currentKana: string = null;

  const dispatch = createEventDispatcher();
  let text = "";

  function handleSubmit() {
    dispatch("input", { text: "" });
    dispatch("submitAnswer", { text });
    text = "";
  }

  function handleInput(event: any) {
    dispatch("input", { text });
    if (currentKana === null) {
      return;
    }
    if (event.data === " ") {
      text = text.trim();
      handleSubmit();
    }
    if (
      ($settings.autoCommit === 'lazy' && isCorrectAnswer(text, currentKana)) ||
      ($settings.autoCommit === 'strict' && text.length === getAnswers(currentKana).map(s => s.length).sort().reverse()[0])
    ) {
      handleSubmit();
    }
  }
</script>

<style lang="scss">
  .answer-input {
    display: flex;
    position: relative;
    background-color: var(--background-contrast);
    border-bottom: 2px solid var(--background-contrast-light);
    border-radius: 10px;
    max-width: 40em;
    margin: 0 auto;
  }

  .text-field {
    font-size: 1.5em;
    margin: 0;
    width: 100%;
    text-align: center;
    height: 3em;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;

    &:focus {
      outline: none;
    }
    &::placeholder {
      transition: 250ms var(--standard-transition) color;
      color: var(--text-color-light);
    }
    &:focus::placeholder {
      color: var(--text-color-lighter);
    }
  }

  .submit-button {
    color: inherit;
    background: none;
    margin: 0;
    border: 0;
    padding: 0;
    font-size: 2em;
    width: 2em;
    height: 100%;
    cursor: pointer;

    position: absolute;
    right: 0;

    // center content
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: var(--text-color) dotted 3px;
      outline-offset: 4px;
    }
  }
</style>

<form class="answer-input" on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    class="text-field"
    bind:value={text}
    on:input={handleInput}
    placeholder="ローマ字入力"
    aria-label="Input rōmaji"
    lang="ja"
    autocapitalize="none"
    autocomplete="off"
    autocorrect="off"
    spellcheck={false} />
  <button type="submit" class="submit-button" title="Submit">
    <Icon size="1.5em" path={mdiChevronRight} />
  </button>
</form>
