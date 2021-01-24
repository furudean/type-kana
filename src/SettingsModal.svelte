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
    class="settings-container"
    use:focusTrap
    transition:fly={{ duration: 400, easing: cubicOut, y: -150 }}
    aria-modal="true"
    aria-describedby="settings-header"
  >
    <div class="settings-menu" use:onClickOutside={close}>
      <h1 id="settings-header">Settings</h1>
      <fieldset>
        <legend>Auto commit</legend>
        <p>Automatically submit when input is correct.</p>

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
      <fieldset>
        <legend>Error indicator</legend>
        <Checkbox
          id="error-marker-setting"
          bind:checked={$settings.showErrorMarker}
        /><label for="error-marker-setting">
          Display an icon if written answer is wrong
        </label>
      </fieldset>
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
        <br />
      </fieldset>
      <fieldset>
        <legend>Audio</legend>
        <label for="audio-volume-setting" class="sr-only">Volume (%)</label>
        <div class="slider-container">
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
      </fieldset>
      <fieldset>
        <legend>Clear local storage</legend>
        <Checkbox
          id="reset-on-close-setting"
          bind:checked={resetOnClose}
        /><label for="reset-on-close-setting">
          Reset all saved data after closing settings
        </label>
      </fieldset>
      <br />
      <Button on:click={close}>
        <Icon title="Left arrow" path={mdiArrowLeft} size="1.5em" />
        Done
      </Button>
    </div>
  </section>
{/if}

<style lang="scss">
  .overlay {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--overlay-background-color);
  }
  .settings-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .settings-menu {
    margin: 0 auto;
    background: var(--background-color);
    padding: 2em 2em 0;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
    box-sizing: border-box;
    max-width: 800px;
    overflow-y: scroll;
    max-height: 80%;
    position: relative;

    // https://github.com/w3c/csswg-drafts/issues/129
    &:after {
      content: "";
      display: block;
      height: 6em;
    }

    > :first-child {
      margin-top: 0;
    }
  }

  .settings-menu {
    :global(input[type="checkbox"]) {
      margin: 1em;
    }
    :global(input[type="checkbox"] + label) {
      cursor: pointer;
      user-select: none;
    }
    :global(input[type="radio"]) {
      margin: 1em;
    }
    :global(input[type="radio"] + label) {
      cursor: pointer;
      user-select: none;
    }
  }

  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid var(--text-color-lighter);
    padding-bottom: 1em;
    margin-top: 1em;
  }

  legend {
    padding: 0;
    font-size: 1.25em;
  }

  label {
    display: inline-block;
  }

  p {
    margin-top: 1em;
    margin-bottom: 0;
  }

  .settings-menu > :global(button) {
    --icon-visual-offset-left: -5px;
  }

  .slider-container {
    display: flex;
    align-items: center;
    margin-top: 1em;

    :global(:first-child) {
      margin-right: 0.5em;
    }
  }
</style>
