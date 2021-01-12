<script lang="ts">
  import { getAnswers } from "@/lib/answer";
  import type { KanaCheckbox } from "@/stores/gameConfig";
  import { kanaType } from "@/stores/gameConfig";
  import { toKatakana } from "wanakana";
  import { fall } from "@/lib/animate";

  export let item: KanaCheckbox;
  export let delay = 0;

  const initDelay = delay;
</script>

<style lang="scss">
  $border-width: 3px;

  .checkbox-kana {
    font-family: "M+ 2c";
    appearance: none;
    font-size: 1.5em;
    outline: none;
    margin-left: 10px;
    cursor: pointer;
    line-height: 1;
    white-space: nowrap;
    position: relative;
    background: none;
    border: none;
    padding: 0;
    user-select: none;

    &:first-of-type {
      margin-left: 0;
    }
  }

  .block {
    color: var(--text-color-light);
    background: var(--background-color);
    border: $border-width solid var(--text-color-lighter);
    border-radius: var(--standard-border-radius);
    transition: 150ms var(--standard-transition) color,
      150ms var(--standard-transition) background,
      150ms var(--standard-transition) border-color;
    padding: 0.25em;

    &:hover,
    &:focus {
      color: var(--text-color);
      border-color: var(--text-color-light);
    }
  }

  .checked > .block {
    color: var(--text-color-on-accent-color);
    border-color: transparent;

    &.hiragana {
      background: var(--accent-color);
    }
    &.katakana {
      background: var(--secondary-accent-color);
    }
  }

  .checkbox-kana:hover > .block,
  .checkbox-kana:focus > .block {
    border-color: var(--border-color-on-accent-color);
    color: var(--text-color-on-accent-color);
  }

  .popover {
    position: absolute;
    top: -4px;
    left: -4px;
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
    delay = 0;
    item.checked = !item.checked;
  }}>
  {#if $kanaType === 'hiragana'}
    <div class="block hiragana">{item.kana}</div>
  {/if}
  {#if $kanaType === 'both' && item.checked}
    <div
      class="block hiragana popover"
      in:fall={{ duration: 200, delay }}
      on:introend={() => {
        // after animation has been played, we reset the delay in case it was
        // changed by something external
        delay = initDelay;
      }}>
      {item.kana}
    </div>
  {/if}
  {#if $kanaType === 'katakana' || $kanaType === 'both'}
    <div class="block katakana">{toKatakana(item.kana)}</div>
  {/if}
</button>
