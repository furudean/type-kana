<script lang="ts">
  import { settings } from "./lib/settings";
</script>

<style>
  fieldset {
    border: 0;
  }
  input[type="radio"] {
    margin: 0.4em;
  }
  label {
    display: inline-block;
  }
</style>

<form class="settings-menu">
  <h2>Settings</h2>
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
</form>
