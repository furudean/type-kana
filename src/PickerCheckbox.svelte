<script lang="ts">
  import { getAnswers } from "@/lib/answer";
  import type { KanaCheckbox } from "@/stores/gameConfig";
  import { kanaType } from "@/stores/gameConfig";
  import { toKatakana } from "wanakana";

  export let item: KanaCheckbox;
</script>

<style lang="scss">
  $border-width: 3px;

  .checkbox-kana {
    font-family: "M+ 2c";
    appearance: none;
    font-size: 1.5em;
    color: var(--text-color-light);
    background: var(--background-color);
    border: $border-width solid var(--text-color-lighter);
    border-radius: var(--standard-border-radius);
    outline: none;
    margin-left: 10px;
    cursor: pointer;
    line-height: 1;
    padding: 0.25em;
    transition: 150ms var(--standard-transition) color,
      150ms var(--standard-transition) background,
      150ms var(--standard-transition) border-color;
    white-space: nowrap;
    position: relative;

    &:first-of-type {
      margin-left: 0;
    }

    &:hover,
    &:focus {
      color: var(--text-color);
      border-color: var(--text-color-light);
    }

    &.checked {
      &.hiragana,
      &.both {
        background: var(--accent-color);
      }
      &.katakana {
        background: var(--secondary-accent-color);
      }
      color: var(--text-color-on-accent-color);
      border-color: transparent;

      &:hover,
      &:focus {
        border-color: var(--border-color-on-accent-color);
      }
    }

    @keyframes slide-out {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(5px, -5px);
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: -$border-width;
      left: -$border-width;
      width: 100%;
      height: 100%;
      z-index: -1;
      border-radius: var(--standard-border-radius);
      background: transparent;
      border: $border-width solid var(--text-color-lighter);
      transition: 150ms var(--standard-transition) background,
        150ms var(--standard-transition) border-color;
      pointer-events: none;
      display: none;
      animation: 250ms var(--standard-transition) forwards slide-out;
    }
    &.both::before {
      display: block;
    }
    &.checked::before {
      background: var(--secondary-accent-color);
      border-color: var(--secondary-accent-color);
    }
    // &:hover::before,
    //   &:focus::before {
    //     border-color: var(--border-color-on-accent-color);
    //   }
  }
</style>

<button
  class="checkbox-kana"
  role="checkbox"
  class:checked={item.checked}
  class:hiragana={$kanaType === 'hiragana'}
  class:katakana={$kanaType === 'katakana'}
  class:both={$kanaType === 'both'}
  aria-checked={item.checked}
  title={`${item.checked ? 'Deselect' : 'Select'} '${getAnswers(item.kana)[0]}'`}
  aria-label={`kana '${getAnswers(item.kana)[0]}'`}
  on:click={() => {
    item.checked = !item.checked;
  }}>
  {#if $kanaType === 'hiragana' || $kanaType === 'both'}{item.kana}{/if}
  {#if $kanaType === 'katakana'}{toKatakana(item.kana)}{/if}
</button>
