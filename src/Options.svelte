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
      id="hiragana-choice"
      type="radio"
      bind:group={$settings.kanaType}
      value="hiragana" />
    <label for="hiragana-choice">Hiragana</label>

    <input
      id="katakana-choice"
      type="radio"
      bind:group={$settings.kanaType}
      value="katakana" />
    <label for="katakana-choice">Katakana</label>

    <input
      id="both-choice"
      type="radio"
      bind:group={$settings.kanaType}
      value="both" />
    <label for="both-choice">Both</label>
  </fieldset>
</form>
