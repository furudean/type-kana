<script lang="ts">
  import { onMount } from "svelte";
  import { mdiOpenInNew } from "@mdi/js";
  import { svgToDataUrl } from "@/lib/util";

  export let href: string;
  export let target = "_self";
  export let rel = "noopener";

  let element: HTMLElement;

  onMount(() => {
    const iconDataUrl = svgToDataUrl(mdiOpenInNew);
    element.style.setProperty("--icon-url", `url("${iconDataUrl}")`);
  });
</script>

<a {href} {target} {rel} {...$$restProps} bind:this={element}>
  <slot />
</a>

<style lang="scss">
  a,
  a:visited {
    color: var(--accent-color);
    text-decoration: none;
    transition: transform 50ms var(--standard-transition);

    &:hover {
      text-decoration: underline dotted var(--accent-color);
    }
    &:focus {
      outline: none;
      color: var(--background-color);
      background-color: var(--accent-color);
      text-decoration: underline dotted var(--background-color);
    }
    &:active {
      transform: translateY(10%);
    }
  }

  a[target="_blank"] {
    &:after {
      content: "";
      display: inline-block;
      vertical-align: baseline;
      position: relative;
      top: 2px; // visual balance
      width: 1em;
      height: 1em;
      background-color: var(--accent-color);
      mask-image: var(--icon-url);
      mask-repeat: no-repeat;
      mask-position: 50% 50%;
    }
    &:focus:after {
      background-color: var(--background-color);
    }
  }
</style>
