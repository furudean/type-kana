<script lang="ts">
  import { focusTrap } from "svelte-focus-trap";
  import { settings } from "@/stores/settings";
  import { osTheme } from "@/stores/theme";
  import {
    playMaximizeSound,
    playMinimizeSound,
    playTapSound,
  } from "@/lib/sound";
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { onDestroy } from "svelte";
  import { onClickOutside } from "@/lib/clickOutside";
  import Button from "./components/Button.svelte";
  import {
    mdiArrowLeft,
    mdiVolumeOff,
    mdiVolumeMedium,
    mdiVolumeHigh,
  } from "@mdi/js";
  import Icon from "./components/Icon.svelte";
  import Range from "./components/Range.svelte";
  import { throttle } from "@/lib/util";
  import Checkbox from "./components/Checkbox.svelte";
  import Radio from "./components/Radio.svelte";
  import { commitHashShort, commitHashLong } from "@/lib/version";
  import Link from "./components/Link.svelte";
  import { scrollLock } from "./lib/scollLock";

  let isOpen = false;
  let resetOnClose = false;

  export function open() {
    if (!isOpen) {
      isOpen = true;
      playMaximizeSound();
    }
  }
  export function close() {
    if (isOpen) {
      isOpen = false;
      playMinimizeSound();

      if (resetOnClose) {
        localStorage.clear();
        location.reload();
      }
    }
  }

  function keyPress(event: KeyboardEvent) {
    // avoid events during IME composition
    if (event.isComposing) {
      return;
    }
    // close modal if escape is hit
    if (isOpen && event.key === "Escape") {
      close();
    }
  }

  let volumeIconPath: string;
  let volumeIconViewBox: string;
  let volumeIconColor: string;

  const unsubscribe = settings.subscribe(($settings) => {
    const vol = $settings.volume;
    if (vol === 0) {
      volumeIconPath = mdiVolumeOff;
      volumeIconViewBox = "0 0 24 24";
      volumeIconColor = "var(--highlight-color)";
    } else if (vol < 50) {
      volumeIconPath = mdiVolumeMedium;
      volumeIconViewBox = "2 0 24 24";
      volumeIconColor = "currentColor";
    } else if (vol >= 50) {
      volumeIconPath = mdiVolumeHigh;
      volumeIconViewBox = "0 0 24 24";
      volumeIconColor = "currentColor";
    }
  });

  onDestroy(unsubscribe);

  const playTapSoundThrottled = throttle(playTapSound, 80);
</script>

<svelte:window on:keyup={keyPress} />

{#if isOpen}
  <div
    class="overlay"
    aria-hidden="true"
    transition:fade={{ duration: 500, easing: cubicOut }}
  />
  <section
    class="settings-menu"
    use:onClickOutside={close}
    role="dialog"
    aria-modal="true"
    aria-labelledby="settings-heading"
    use:focusTrap
    use:scrollLock
    transition:fly={{ duration: 400, easing: cubicOut, y: -150 }}
  >
    <h1 id="settings-heading">Settings</h1>

    <hr />

    <h2>Quiz</h2>
    <Checkbox
      id="retry-incorrect-answers-setting"
      bind:checked={$settings.retryIncorrectAnswers}
    /><label for="retry-incorrect-answers-setting">
      Put incorrect answers back in queue
    </label>

    <fieldset>
      <legend>Auto submit</legend>

      <Radio
        id="auto-commit-disabled-choice"
        name="auto-commit-choice"
        bind:group={$settings.autoCommit}
        value="disabled"
      /><label for="auto-commit-disabled-choice">Disabled</label>
      <br />

      <Radio
        id="auto-commit-lazy-choice"
        name="auto-commit-choice"
        bind:group={$settings.autoCommit}
        value="lazy"
      /><label for="auto-commit-lazy-choice">Lazy mode</label>
      <br />

      <Radio
        id="auto-commit-strict-choice"
        name="auto-commit-choice"
        bind:group={$settings.autoCommit}
        value="strict"
      /><label for="auto-commit-strict-choice">Strict mode</label>
    </fieldset>

    <hr />

    <h2>Appearance</h2>
    <Checkbox
      id="error-marker-setting"
      bind:checked={$settings.showErrorMarker}
    /><label for="error-marker-setting">
      Display an icon if written answer is wrong
    </label>
    <br />

    <Checkbox
      id="progress-bar-setting"
      bind:checked={$settings.showProgressBar}
    /><label for="progress-bar-setting">
      Show a bar that indicates completion percentage
    </label>

    <fieldset>
      <legend>Theme</legend>

      <Radio
        id="same-as-system-theme-choice"
        name="theme-choice"
        bind:group={$settings.theme}
        value="same-as-system"
      /><label for="same-as-system-theme-choice">
        Same as system ({$osTheme})
      </label>
      <br />

      <Radio
        id="light-theme-choice"
        name="theme-choice"
        bind:group={$settings.theme}
        value="light"
      /><label for="light-theme-choice">Light</label>
      <br />

      <Radio
        id="dark-theme-choice"
        name="theme-choice"
        bind:group={$settings.theme}
        value="dark"
      /><label for="dark-theme-choice">Dark</label>
    </fieldset>

    <hr />

    <h2>Audio</h2>
    <label for="audio-volume-setting" class="sr-only">Volume (%)</label>
    <div class="volume-slider">
      <Icon
        title="Volume icon"
        bind:path={volumeIconPath}
        bind:viewBox={volumeIconViewBox}
        color={volumeIconColor}
        size="1.5em"
        ariaHidden={true}
      />
      <Range
        id="audio-volume-setting"
        bind:value={$settings.volume}
        min={0}
        max={100}
        tooltip={true}
        unit="%"
        width="200px"
        on:input={playTapSoundThrottled}
      />
    </div>

    <hr />

    <h2>Danger zone</h2>
    <Checkbox id="reset-on-close-setting" bind:checked={resetOnClose} /><label
      for="reset-on-close-setting"
    >
      Reset all saved data after closing settings
    </label>

    <hr />

    <section class="menu">
      <Button on:click={close}>
        <Icon title="Left arrow" path={mdiArrowLeft} size="1.5em" />
        Done
      </Button>
      <Link
        href="https://github.com/c-bandy/type-kana/commit/{commitHashLong}"
        target="_blank"
        title="Open commit for current build in GitHub"
        aria-label="Open commit for current build in GitHub"
      >
        {commitHashShort}
      </Link>
    </section>
  </section>
{/if}

<style lang="scss">
  .overlay {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--overlay-background-color);
  }

  .settings-menu {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: var(--background-color);
    padding: 0 2em;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
    box-sizing: border-box;
    width: 700px;
    max-width: 100%;
    overflow-y: scroll;
    max-height: 85%;

    // https://github.com/w3c/csswg-drafts/issues/129
    &:after {
      content: "";
      display: block;
      height: 4em;
    }
  }

  @media screen and (max-width: 700px) {
    .settings-menu {
      max-height: 100%;
      border-radius: 0;
      left: 0;
      transform: none;
    }
  }

  .settings-menu {
    :global(input[type="checkbox"]),
    :global(input[type="radio"]) {
      margin: 1em;
    }
    :global(input[type="checkbox"] + label),
    :global(input[type="radio"] + label) {
      user-select: none;
    }
    :global(input[type="checkbox"]:not(:disabled) + label),
    :global(input[type="radio"]:not(:disabled) + label) {
      cursor: pointer;
    }
  }

  h1 {
    margin: 1em 0;
    font-size: 1.8em;
    font-weight: 700;
  }

  h2 {
    margin: 1em 0;
    font-size: 1.4em;
    font-weight: 500;
  }

  hr {
    border: none;
    background: var(--text-color-lighter);
    height: 1px;
    margin: 2em 0;
  }

  fieldset {
    appearance: none;
    margin: 0;
    padding: 0;
    border: 0;
  }

  legend {
    padding: 0;
    margin: 1em 0 0.5em;
    font-size: 1.2em;
    font-weight: normal;
  }

  label {
    display: inline-block;
  }

  .settings-menu > :global(button) {
    --icon-visual-offset-left: -5px;
  }

  .volume-slider {
    display: flex;
    align-items: center;
    margin-top: 1em;

    :global(:first-child) {
      margin-right: 0.5em;
    }
  }

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3em;
  }
</style>
