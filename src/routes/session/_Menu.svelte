<script lang="ts">
  import { mdiCogOutline, mdiArrowLeft, mdiRestart } from "@mdi/js";
  import Icon from "../../components/Icon.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { loadDropSound, playDropSound } from "@/lib/sound";

  const dispatch = createEventDispatcher();

  let spinElement: HTMLElement;
  let isRestartAnimationPlaying = false;

  function menuEvent(type: string) {
    dispatch("menuEvent", { type });
  }

  onMount(() => {
    loadDropSound();
  });
</script>

<section class="menu">
  <a href="/" class="button" title="Go back" use:link>
    <Icon path={mdiArrowLeft} />
  </a>

  <button
    type="button"
    class="button tilt"
    title="Open game settings"
    on:click={() => {
      menuEvent("openSettings");
    }}
  >
    <span class="tilt-animation-container">
      <Icon path={mdiCogOutline} />
    </span>
  </button>

  <button
    type="button"
    class="button tilt reverse"
    class:reset-animation-playing={isRestartAnimationPlaying}
    title="Restart quiz"
    on:click={() => {
      menuEvent("restart");
      playDropSound();
      isRestartAnimationPlaying = true;
    }}
  >
    <span class="tilt-animation-container">
      <span
        class="reset-animation-container"
        bind:this={spinElement}
        on:animationend={() => {
          isRestartAnimationPlaying = false;
        }}
      >
        <Icon path={mdiRestart} />
      </span>
    </span>
  </button>
</section>

<style lang="scss">
  .menu {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2em;
  }

  .menu > * {
    margin: 0;
    margin-left: 0.75em;

    &:first-child {
      margin-left: 0 !important;
    }
  }

  .button {
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
      transform: translateY(8%);
    }
  }

  .button span {
    display: flex;
  }

  .button.tilt {
    & .tilt-animation-container {
      transition: transform 150ms var(--standard-transition);
    }
    &:hover > :global(*),
    &:focus > :global(*) {
      transform: rotate(-45deg);
    }
  }

  @keyframes reverse {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  .button.reset-animation-playing .reset-animation-container {
    animation: 500ms reverse var(--standard-transition);
  }
</style>
