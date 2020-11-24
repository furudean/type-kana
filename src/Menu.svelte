<script lang="ts">
  import { mdiCogOutline, mdiGithub, mdiLaunch } from "@mdi/js";
  import Icon from "./Icon.svelte";
  import { createEventDispatcher } from "svelte";
  import { commitHash } from "@/lib/version";

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
    align-items: center;
    margin-top: 2em;
  }

  .menu-item {
    color: var(--accent-color);
    margin: 0;
    margin-left: 0.75em;

    &:first-child {
      margin-left: 0 !important;
    }
  }
  .button.menu-item {
    display: flex;
    appearance: none;
    background: none;
    font-size: 2.5em;
    margin-left: 0.25em;
    padding: 0.1em;
    cursor: pointer;
    border-radius: 50%;
    border: 3px dashed transparent;
    transition: transform 125ms var(--standard-transition),
      color 125ms var(--standard-transition),
      background-color 125ms var(--standard-transition),
      border 125ms var(--standard-transition);

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
  a.menu-item {
    color: var(--accent-color);
  }
</style>

<section class="menu">
  <button
    class="menu-item button"
    type="button"
    title="Open game settings"
    on:click={() => {
      menuEvent('openSettings');
    }}>
    <Icon path={mdiCogOutline} />
  </button>
  <a
    class="menu-item button"
    href="https://github.com/c-bandy/type-kana"
    target="_blank"
    rel="noopener"
    title="Show GitHub repository">
    <Icon path={mdiGithub} />
  </a>
  <a
    class="menu-item text-link external"
    href="https://github.com/c-bandy/type-kana/commit/{commitHash}"
    target="_blank"
    rel="noopener">
    {commitHash}
  </a>
</section>
