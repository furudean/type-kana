<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let id: string = undefined;
  export let value: number;
  export let min: string | number = 0;
  export let max: string | number = 100;
  export let step: string | number = undefined;
  export let list: string | undefined = undefined;

  export let width = "100%";
  export let inline = false;
  export let tooltip = false;
  export let unit = "";

  const dispatch = createEventDispatcher();

  let rangeElement: HTMLElement;

  let isTooltipVisible = false;
  let tooltipStyle = "";

  let timeoutId: number | undefined;

  function touchTooltip() {
    if (tooltip) {
      isTooltipVisible = true;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isTooltipVisible = false;
      }, 1000);
    }
  }

  function updateTooltipPosition() {
    if (rangeElement && tooltip) {
      const p = value / Number(max);
      const rangeWidth = rangeElement.clientWidth;
      const thumbWidth = 18; // hardcoded, cannot read shadow DOM width

      const start = thumbWidth / 2;
      const end = rangeWidth - thumbWidth;

      const offset = start + end * p;

      tooltipStyle = `left: ${offset}px`;
    }
  }

  function handleInput(event: Event) {
    dispatch("input", (event as any).detail);

    touchTooltip();
    updateTooltipPosition();
  }

  onMount(updateTooltipPosition);
</script>

<svelte:window on:resize|passive={updateTooltipPosition} />

<div class="range-container" class:inline={inline || width !== "100%"}>
  {#if tooltip && isTooltipVisible}
    <div
      class="tooltip"
      aria-hidden="true"
      style={tooltipStyle}
      out:fade={{ duration: 1000, easing: cubicOut }}
    >
      {value + unit}
    </div>
  {/if}
  <input
    type="range"
    {id}
    {min}
    {max}
    {step}
    {list}
    bind:value
    style={`width: ${width};`}
    bind:this={rangeElement}
    on:input={handleInput}
    on:change
  />
</div>

<style lang="scss">
  .range-container {
    position: relative;
    line-height: 0;

    &.inline {
      display: inline-block;
    }
  }

  input[type="range"] {
    --thumb-size: 18px;
    --thumb-color: var(--form-element-secondary-color);
    --track-height: 6px;
    --track-border-radius: calc(var(--track-height) / 2);
    --track-color: var(--form-element-secondary-background-color);

    display: inline-block;
    appearance: none;
    border: none;
    background: none;
    height: var(--thumb-size);
    outline: none;
    margin: 0;
    cursor: pointer;
  }

  // Chrome

  input::-webkit-slider-runnable-track {
    background: var(--track-color);
    height: var(--track-height);
    border-radius: var(--track-border-radius);
  }

  input::-webkit-slider-thumb {
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: var(--thumb-color);
    border-radius: 50%;
    outline: none;
    transform: translateY(-25%);
  }

  // Firefox

  input[type="range"]::-moz-range-thumb {
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: var(--thumb-color);
    border-radius: 50%;
    outline: none;
    border: none;
    margin: 0;
  }

  input[type="range"]::-moz-range-progress {
    background: var(--thumb-color);
    border-radius: var(--track-border-radius);
    border: none;
    height: var(--track-height);
    opacity: 0.66;
  }

  input[type="range"]::-moz-range-track {
    background: var(--track-color);
    border-radius: var(--track-border-radius);
    border: none;
    height: var(--track-height);
  }

  input[type="range"]:focus {
    &::-webkit-slider-thumb {
      border-color: var(--focus-color);
    }
    &::-moz-range-thumb {
      border-color: var(--focus-color);
    }
  }

  .tooltip {
    display: inline-block;
    position: absolute;
    top: calc(-100% - 1em);
    background: var(--background-color-inverse);
    color: var(--text-color-inverse);
    border-radius: 100px;
    font-weight: 500;
    font-size: 90%;
    letter-spacing: 1px;
    line-height: 1;
    padding: 0.3em 0.5em;
    transform: translateX(-50%);
    user-select: none;
    min-width: 12px;
    text-align: center;
  }

  // tooltip triangle
  .tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    border-width: 4px;
    border-style: solid;
    border-color: var(--background-color-inverse) transparent transparent
      transparent;
    transform: translateX(-50%);
  }
</style>
