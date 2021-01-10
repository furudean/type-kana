<script lang="ts">
  import { getAnswers } from "@/lib/answer";
  import type { KanaCheckbox } from "@/stores/gameConfig";
  import { kanaType } from "@/stores/gameConfig";
  import { toKatakana } from "wanakana";

  export let item: KanaCheckbox;
</script>

<style lang="scss">
  .checkbox-kana {
    font-family: "M+ 2c";
    appearance: none;
    display: flex;
    font-size: 1.75em;
    color: var(--text-color-light);
    background: transparent;
    border: 3px solid var(--text-color-lighter);
    border-radius: var(--standard-border-radius);
    outline: none;
    margin-left: 8px;
    cursor: pointer;
    line-height: 1;
    padding: 0.25em;
    transition: 100ms var(--standard-transition) color,
      150ms var(--standard-transition) background,
      150ms var(--standard-transition) border-color;

    &:first-of-type {
      margin-left: 0;
    }

    &:hover,
    &:focus {
      color: var(--text-color);
      border-color: var(--text-color-light);
    }

    &.checked {
      color: var(--text-color-on-accent-color);
      background: var(--accent-color);
      border-color: transparent;

      &:hover,
      &:focus {
        border-color: var(--border-color-on-accent-color);
      }
    }
  }
</style>

<button
  class="checkbox-kana"
  role="checkbox"
  class:checked={item.checked}
  aria-checked={item.checked}
  title={`${item.checked ? 'Deselect' : 'Select'} '${getAnswers(item.kana)[0]}'`}
  aria-label={`kana '${getAnswers(item.kana)[0]}'`}
  on:click={() => {
    item.checked = !item.checked;
  }}>
  {#if $kanaType === 'hiragana' || $kanaType === 'both'}
    <span>{item.kana}</span>
  {/if}
  {#if $kanaType === 'both'}<span>・</span>{/if}
  {#if $kanaType === 'katakana' || ($kanaType === 'both')}
    <span>{toKatakana(item.kana)}</span>
  {/if}
</button>
