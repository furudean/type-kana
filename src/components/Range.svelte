<script lang="ts">
  import { createEventDispatcher } from "svelte";
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
  export let tooltip: string | boolean = undefined;

  const dispatch = createEventDispatcher();

  let rangeElement: HTMLElement;

  let hasTooltip = !["false", "no"].includes(tooltip.toString());
  let hasFocus = false;
  let isTooltipVisible = false;
  let tooltipStyle = "";

  function enter() {
    if (hasTooltip) {
      updateTooltipPosition();
      isTooltipVisible = true;
    }
  }

  function leave() {
    if (hasTooltip && !hasFocus) {
      isTooltipVisible = false;
    }
  }

  function updateTooltipPosition() {
    if (hasTooltip) {
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
    updateTooltipPosition();
  }
</script>

<svelte:window on:resize|passive={updateTooltipPosition} />

<div class="range" class:inline={inline || width !== "100%"}>
  {#if hasTooltip && isTooltipVisible}
    <div
      class="tooltip"
      aria-hidden="true"
      style={tooltipStyle}
      transition:fade={{ duration: 125, easing: cubicOut }}
    >
      {typeof tooltip === "string" && !["yes", "true"].includes(tooltip)
        ? tooltip.replace("[value]", value.toString())
        : value}
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
    on:mouseenter={enter}
    on:mouseleave={leave}
    on:focus={() => {
      hasFocus = true;
      enter();
    }}
    on:focusout={() => {
      hasFocus = false;
      leave();
    }}
    on:change
  />
</div>

<style lang="scss">
  .range {
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
    border: none;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
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
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
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
