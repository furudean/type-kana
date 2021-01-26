<script lang="ts">
  import { onMount } from "svelte";
  import { mdiCheckBold, mdiMinusThick } from "@mdi/js";
  import { svgToDataUrl } from "@/lib/util";

  export let title: string = undefined;
  export let id: string = undefined;
  export let checked: boolean;
  export let indeterminate: boolean = undefined;
  export let disabled: boolean = undefined;
  export let ariaLabel: string = undefined;

  let element: HTMLElement;

  onMount(() => {
    const checkedIcon = svgToDataUrl(mdiCheckBold);
    element.style.setProperty("--checked-icon-url", `url("${checkedIcon}")`);

    const indeterminateIcon = svgToDataUrl(mdiMinusThick);
    element.style.setProperty(
      "--indeterminate-icon-url",
      `url("${indeterminateIcon}")`
    );
  });
</script>

<input
  type="checkbox"
  {title}
  {id}
  bind:checked
  bind:this={element}
  {disabled}
  {indeterminate}
  aria-label={ariaLabel}
  on:click
/>

<style lang="scss">
  input[type="checkbox"] {
    --checked-color: hsl(202, 87%, 40%);
    --checked-highlight-color: hsl(202, 87%, 48%);

    appearance: none;
    position: relative;
    display: inline-block;
    outline: none;
    vertical-align: middle;
    line-height: inherit;
    cursor: pointer;
    font-size: inherit;
    width: 1em;
    height: 1em;
    background: white;
    border-radius: 25%;
    margin: 0;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.10);
    border: 1px solid rgba(0, 0, 0, 0.15);
    transition: 125ms var(--standard-transition) background-color;
  }

  // Checked + indeterminate states

  input[type="checkbox"]::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    mask-position: center;
    mask-repeat: no-repeat;
  }

  input[type="checkbox"]:checked {
    background: var(--checked-color);
    box-shadow: inset 0 1px 3px var(--checked-highlight-color);
    border: 1px solid var(--checked-highlight-color);

    &:after {
      mask-image: var(--checked-icon-url);
      mask-size: 90%;
      background-color: white;
    }
  }

  input[type="checkbox"]:indeterminate:after {
    mask-image: var(--indeterminate-icon-url);
    mask-size: 78%;
    background-color: hsl(0, 0%, 60%);
  }

  // Disabled state

  input[type="checkbox"]:disabled {
    background-color: hsl(0, 0%, 50%);
    box-shadow: inset 0 1px 3px hsl(0, 0%, 55%);
    cursor: auto;
  }

  // Focus state

  input[type="checkbox"]:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 0 0 0 3px var(--focus-color);
    border-radius: 25%;
    opacity: 0;
    transition: 125ms var(--standard-transition) opacity;
  }

  input[type="checkbox"]:focus:before {
    opacity: 1;
  }

  // Active state

  input[type="checkbox"]:checked:not(:disabled):active {
    background-color: var(--checked-highlight-color);
    transition: 60ms var(--standard-transition) transform;
  }
</style>
