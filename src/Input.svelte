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

<style lang="scss">  
  form {
    display: flex;
    position: relative;
  }

  input {
    margin: 0;
    font-size: 1.5em;
  }

  .text-field {
    width: 100%;
    text-align: center;
    height: 3em;
    padding: 0;
    border: 0;
    border-bottom: 2px solid #ccc;
    border-radius: 10px;
    
    &:focus {
      outline: none;
    }
    &::placeholder {
      transition: 250ms var(--standard-transition);
      color: #ccc;
    }
    &:focus::placeholder {
      color: #9e9e9e;
    }
  }

  .submit-button {
    background: none;
    border: 0;
    border-radius: 10px;
    padding: 0 1em;
    font-size: 2em;
    position: absolute;
    right: 0;
    height: 100%;
    z-index: 1;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    class="text-field"
    lang="ja"
    autocapitalize="none"
    autocomplete="off"
    autocorrect="off"
    placeholder="ローマ字入力"
    spellcheck={false}
    bind:value={text} />
  <input class="submit-button" type="submit" value="→" />
</form>
