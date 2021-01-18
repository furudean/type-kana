<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let title: string = undefined;
</script>

<button
  type="button"
  {title}
  on:click={() => {
    dispatch("click");
  }}>
  <slot />
</button>

<style lang="scss">
  button {
    --border-size: 3px;
    --padding-horizontal: 1.5em;
    --padding-vertical: 0.75em;
    --icon-visual-offset-right: 0px;
    --icon-visual-offset-left: 0px;

    appearance: none;
    outline: none;
    cursor: pointer;
    background: var(--accent-color);
    font-family: "M+ 2c";
    font-size: 1em;
    font-weight: 500;
    color: var(--text-color-on-accent-color);
    border: var(--border-size) solid transparent;
    border-radius: var(--standard-border-radius);
    padding-top: calc(var(--padding-vertical) - var(--border-size));
    padding-bottom: calc(var(--padding-vertical) - var(--border-size));
    padding-right: calc(
      var(--padding-horizontal) - var(--border-size) +
        var(--icon-visual-offset-right)
    );
    padding-left: calc(
      var(--padding-horizontal) - var(--border-size) +
        var(--icon-visual-offset-left)
    );
    transition: transform 50ms var(--standard-transition),
      border 125ms var(--standard-transition);
  }

  button:focus,
  button:hover {
    border-color: var(--focus-color);
  }

  button:active {
    transform: translateY(10%);
  }
</style>
