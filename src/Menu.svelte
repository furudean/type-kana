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
  .menu {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }

  .menu-item {
    display: flex;
    color: var(--accent-color);
    background: none;
    margin: 0;
    margin-left: 0.25em;
    font-size: 2.5em;
    padding: 0.1em;
    cursor: pointer;
    border-radius: 50%;
    border: 3px dashed transparent;
    transition: transform 125ms var(--standard-transition),
      color 125ms var(--standard-transition),
      background-color 125ms var(--standard-transition),
      border 125ms var(--standard-transition);

    &:first-child {
      margin-left: 0;
    }
    &:focus {
      outline: none;
      color: var(--background-color);
      background-color: var(--accent-color);
    }
    &:hover {
      border: 3px dashed var(--accent-color);
    }
    &:active {
      color: var(--background-color);
      background-color: var(--accent-color);
      transform: translateY(4px);
    }
  }
</style>

<section class="menu">
  <button
    class="menu-item"
    type="button"
    title="Open game settings"
    on:click={() => {
      menuEvent('openSettings');
    }}>
    <CogOutline />
  </button>
  <a
    class="menu-item"
    href="https://github.com/c-bandy/type-kana"
    target="_blank"
    rel="noopener"
    title="Show GitHub repository">
    <Github />
  </a>
</section>
