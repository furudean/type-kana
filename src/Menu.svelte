<script lang="ts">
  import { mdiCogOutline, mdiGithub, mdiLaunch, mdiArrowLeft } from "@mdi/js";
  import Icon from "./components/Icon.svelte";
  import { createEventDispatcher } from "svelte";
  import { commitHashShort, commitHashLong } from "@/lib/version";
  import Link from "./components/Link.svelte";
  import ViewLink from "./components/ViewLink.svelte";

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

  .menu > :global(*) {
    margin: 0;
    margin-left: 0.75em;

    &:first-child {
      margin-left: 0 !important;
    }
  }
  .menu > :global(.button) {
    display: flex;
    appearance: none;
    background: none;
    font-size: 2.5em;
    margin-left: 0.25em;
    padding: 0.1em;
    cursor: pointer;
    border-radius: 50%;
    border: 3px dashed transparent;
    transition: transform 50ms var(--standard-transition),
      color 125ms var(--standard-transition),
      background-color 125ms var(--standard-transition),
      border-color 125ms var(--standard-transition);
    color: var(--accent-color);

    &:focus {
      outline: none;
      color: var(--background-color);
      background-color: var(--accent-color);
    }
    &:hover {
      border-color: var(--accent-color);
    }
    &:active {
      color: var(--background-color);
      background-color: var(--accent-color);
      transform: translateY(10%);
    }
  }
</style>

<section class="menu">
  <ViewLink class="button" title="Go back" viewName="pickers">
    <Icon path={mdiArrowLeft} />
  </ViewLink>

  <button
    class="button"
    type="button"
    title="Open game settings"
    on:click={() => {
      menuEvent('openSettings');
    }}>
    <Icon path={mdiCogOutline} />
  </button>
  <a
    class="button"
    href="https://github.com/c-bandy/type-kana"
    target="_blank"
    rel="noopener"
    title="Show GitHub repository">
    <Icon path={mdiGithub} />
  </a>
  <Link
    href="https://github.com/c-bandy/type-kana/commit/{commitHashLong}"
    target="_blank"
    rel="noopener">
    {commitHashShort}
  </Link>
</section>
