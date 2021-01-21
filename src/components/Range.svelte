<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let id: string = undefined;
  export let value: number;
  export let min: string | number = 0;
  export let max: string | number = 100;
  export let step: string | number = 1;

  export let tooltip = false;
  export let unit = "";

  const dispatch = createEventDispatcher();

  let rangeElement: HTMLElement;

  let isTooltipVisible = false;
  let tooltipStyle = "";

  let timeoutId: number | undefined;

  function touchTooltip() {
    isTooltipVisible = true;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      isTooltipVisible = false;
    }, 2000);
  }

  function updateTooltipPosition() {
    if (tooltip) {
      const p = value / Number(max);
      const rangeWidth = rangeElement.clientWidth;
      const thumbWidth = 22; // hardcoded, cannot read shadow DOM width

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

<div class="range-container">
  {#if tooltip && isTooltipVisible}
    <div
      class="tooltip"
      aria-hidden="true"
      style={tooltipStyle}
      out:fade={{ duration: 1000, easing: cubicOut }}
    >{value + unit}</div>
  {/if}
  <input
    type="range"
    {id}
    {min}
    {max}
    {step}
    bind:value
    bind:this={rangeElement}
    on:input={handleInput}
    on:change
  />
</div>

<style lang="scss">
  .range-container {
    position: relative;
  }

  input[type="range"] {
    --thumb-size: 22px;
    --thumb-color: var(--ui-element-primary-color);
    --track-background-color: var(--ui-element-secondary-color);
    --track-border-radius: 4px;
    --track-progress-color: transparent;

    display: inline-block;
    appearance: none;
    border: none;
    width: 100%;
    height: 8px;
    background-color: var(--track-background-color);
    border-radius: var(--track-border-radius);
    outline: none;
    margin: 0;
    cursor: pointer;
  }

  // Chrome

  input::-webkit-slider-thumb {
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: var(--thumb-color);
    border-radius: 50%;
    outline: none;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  // Firefox

  input[type="range"]::-moz-range-thumb {
    appearance: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background: var(--thumb-color);
    border-radius: 50%;
    outline: none;
    cursor: grab;
    border: none;
    margin: 0;

    &:active {
      cursor: grabbing;
    }
  }

  input[type="range"]::-moz-range-progress {
    background: var(--track-progress-color);
    border-radius: var(--track-border-radius);
    border: none;
    height: 100%;
  }

  input[type="range"]::-moz-range-track {
    background: var(--track-background-color);
    border-radius: var(--track-border-radius);
    border: none;
    height: 100%;
  }

  // IE

  // input[type="range"]::-ms-fill-lower {
  //   background-color: #fff;
  //   height: 100%;
  //   border-radius: var(--track-border-radius);
  //   border: none;
  // }
  // input[type="range"]::-ms-fill-upper {
  //   background-color: #ccc;
  //   border-radius: var(--track-border-radius);
  //   border: none;
  //   height: 100%;
  // }

  .tooltip {
    display: inline-block;
    position: absolute;
    top: calc(-100% - 3px);
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
