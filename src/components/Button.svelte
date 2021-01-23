<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let title: string = undefined;
  export let disabled = false;
</script>

<button
  type="button"
  {title}
  {disabled}
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
    letter-spacing: 1px;
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
      color 125ms var(--standard-transition),
      background-color 125ms var(--standard-transition),
      border 125ms var(--standard-transition);
  }

  button:focus:not(:disabled),
  button:hover:not(:disabled) {
    border-color: var(--focus-color);
  }

  button:active:not(:disabled) {
    transform: translateY(10%);
  }

  button:disabled {
    background: var(--text-color-light);
    color: var(--text-color-lighter);
    cursor: not-allowed;
  }
</style>
