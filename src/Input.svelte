<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ChevronRight from "svelte-material-icons/ChevronRight.svelte";

  const dispatch = createEventDispatcher();
  let text = "";

  function handleSubmit() {
    dispatch("submitAnswer", {
      text: text.trim(),
    });
    text = "";
  }
</script>

<style lang="scss">  
  .answer-input {
    display: flex;
    position: relative;
    background: white;
    border-bottom: 2px solid #ccc;
    border-radius: 10px;
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
    
    &:focus {
      outline: none;
    }
    &::placeholder {
      transition: 250ms var(--standard-transition) color;
      color: #ccc;
    }
    &:focus::placeholder {
      color: #9e9e9e;
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
      outline: black dotted 2px;
    }
  }
</style>

<form class="answer-input" on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    class="text-field"
    bind:value={text}
    placeholder="ローマ字入力"
    aria-label="Input rōmaji"
    lang="ja"
    autocapitalize="none"
    autocomplete="off"
    autocorrect="off"
    spellcheck={false} />
  <button 
    type="submit" 
    class="submit-button" 
    title="Submit">
    <ChevronRight size="1.5em"/>
  </button>
</form>
