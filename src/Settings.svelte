<script lang="ts">
  import { focusTrap } from "svelte-focus-trap";
  import { settings } from "./lib/settings";
import { osTheme } from "./lib/theme";

  let isOpen = false;

  export function open() {
    isOpen = true;
  }
  export function close() {
    isOpen = false;
  }

  function keyPress(event: KeyboardEvent) {
    // avoid events during IME composition
    if (event.isComposing) {
      return;
    }
    if (isOpen && event.key === "Escape") {
      close();
    }
  }
</script>

<style lang="scss">
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .settings-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.4);
    animation: 400ms fade-in var(--standard-transition) forwards;
  }

  .settings-menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--background-color);
    padding: 2em 2em 6em;
    border-radius: 1em;
    min-width: 50%;

    > :first-child {
      margin-top: 0;
    }
  }

  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
    margin-top: 1em;
  }

  legend {
    padding: 0;
    font-size: 1.25em;
  }

  input[type="radio"],
  input[type="checkbox"] {
    margin: 1em 0.4em 1em 1em;
  }

  label {
    display: inline-block;
  }

  p {
    margin-top: 1em;
    margin-bottom: 0;
  }
</style>

<svelte:window on:keyup={keyPress} />

{#if isOpen}
  <section class="settings-container" use:focusTrap>
    <div class="settings-menu">
      <h1>Settings</h1>
      <fieldset>
        <legend>I want to practice</legend>

        <input
          id="type-hiragana-choice"
          type="radio"
          bind:group={$settings.kanaType}
          value="hiragana" />
        <label for="type-hiragana-choice">Hiragana</label>

        <input
          id="type-katakana-choice"
          type="radio"
          bind:group={$settings.kanaType}
          value="katakana" />
        <label for="type-katakana-choice">Katakana</label>

        <input
          id="type-both-choice"
          type="radio"
          bind:group={$settings.kanaType}
          value="both" />
        <label for="type-both-choice">Both</label>
      </fieldset>
      <fieldset>
        <legend>Auto commit</legend>
        <p>Automatically submit when input matches the correct answer.</p>
        <input
          type="checkbox"
          name="Auto commit"
          id="auto-commit"
          bind:checked={$settings.autoCommitEnabled} />
        <label for="auto-commit">Enabled</label>
      </fieldset>
      <fieldset>
        <legend>Theme</legend>
  
        <input
          id="same-as-system-theme-choice"
          type="radio"
          bind:group={$settings.theme}
          value="same-as-system" />
        <label for="same-as-system-theme-choice">Same as system ({$osTheme})</label>
        <br>

        <input
          id="light-theme-choice"
          type="radio"
          bind:group={$settings.theme}
          value="light" />
        <label for="light-theme-choice">Light</label>
        <br>

        <input
          id="dark-theme-choice"
          type="radio"
          bind:group={$settings.theme}
          value="dark" />
        <label for="dark-theme-choice">Dark</label>
        <br>

      </fieldset>
      <br>
      <button on:click={close}>Ok</button>
    </div>
  </section>
{/if}
