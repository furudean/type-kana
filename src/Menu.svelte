<script lang="ts">
  import CogOutline from "@c-bandy/svelte-material-icons/dist/CogOutline.svelte";
  import Github from "@c-bandy/svelte-material-icons/dist/Github.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function menuEvent(type: string) {
    dispatch("menuEvent", { type });
  }
</script>

<style lang="scss">
  section {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: 1.5em;
  }

  button,
  a {
    display: flex;
    color: var(--accent-color);
    background: none;
    margin: 0;
    margin-left: 0.25em;
    border: 0;
    font-size: 2.5em;
    padding: 0.25em;
    cursor: pointer;
    border-radius: 10000px;
    border: 3px dashed transparent;
    transition: color 250ms var(--standard-transition),
      background-color 250ms var(--standard-transition),
      border 250ms var(--standard-transition);

    &:first-child {
      margin-left: 0;
    }
    &:focus {
      outline: none;
      border: 3px dashed var(--accent-color);
    }
    &:hover,
    &:active {
      background-color: var(--accent-color);
      color: var(--background-color);
    }
    &:active {
      border: 3px dashed var(--background-color);
    }
  }
</style>

<section>
  <button
    type="button"
    title="Open game settings"
    on:click={() => {
      menuEvent('menuToggle');
    }}>
    <CogOutline />
  </button>
  <a
    href="https://github.com/c-bandy/type-kana"
    target="_blank"
    title="Show GitHub repository">
    <Github />
  </a>
</section>
