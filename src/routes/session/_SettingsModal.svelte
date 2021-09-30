<script lang="ts">
	import { focusTrap } from "svelte-focus-trap"
	import { settings } from "$/stores/settings"
	import { osTheme } from "$/stores/theme"
	import {
		loadTapSound,
		playMaximizeSound,
		playMinimizeSound,
		playTapSound
	} from "$/lib/sound"
	import { fade, fly } from "svelte/transition"
	import { cubicOut } from "svelte/easing"
	import { onMount, onDestroy } from "svelte"
	import { onClickOutside } from "$/lib/click-outside"
	import Button from "$/lib/Button.svelte"
	import {
		mdiArrowLeft,
		mdiVolumeOff,
		mdiVolumeMedium,
		mdiVolumeHigh
	} from "@mdi/js"
	import Icon from "$/lib/MaterialIcon.svelte"
	import Range from "$/lib/Range.svelte"
	import { throttle } from "$/lib/util"
	import Checkbox from "$/lib/Checkbox.svelte"
	import Radio from "$/lib/Radio.svelte"
	import { scrollLock } from "$/lib/scoll-lock"
	import MenuBar from "$lib/MenuBar.svelte"

	export let isOpen = false
	let resetOnClose = false

	export function open() {
		if (!isOpen) {
			isOpen = true
			playMaximizeSound()
		}
	}
	export function close() {
		if (isOpen) {
			isOpen = false
			playMinimizeSound()

			if (resetOnClose) {
				localStorage.clear()
				sessionStorage.clear()
				location.reload()
			}
		}
	}

	function keyPress(event: KeyboardEvent) {
		// avoid events during IME composition
		if (event.isComposing) {
			return
		}
		// close modal if escape is hit
		if (isOpen && event.key === "Escape") {
			close()
		}
	}

	let volumeIconPath: string
	let volumeIconViewBox: string
	let volumeIconColor: string

	const unsubscribe = settings.subscribe(({ volume }) => {
		if (volume === 0) {
			volumeIconPath = mdiVolumeOff
			volumeIconViewBox = "0 0 24 24"
			volumeIconColor = "var(--highlight-color)"
		} else if (volume < 50) {
			volumeIconPath = mdiVolumeMedium
			volumeIconViewBox = "2 0 24 24"
			volumeIconColor = "currentColor"
		} else if (volume >= 50) {
			volumeIconPath = mdiVolumeHigh
			volumeIconViewBox = "0 0 24 24"
			volumeIconColor = "currentColor"
		}
	})

	onDestroy(unsubscribe)

	const playTapSoundThrottled = throttle(playTapSound, 80)

	onMount(() => {
		loadTapSound()
	})
</script>

<svelte:window on:keyup={keyPress} />

{#if isOpen}
	<div
		class="overlay"
		aria-hidden="true"
		transition:fade={{ duration: 500, easing: cubicOut }}
	/>
	<section
		class="settings-menu content-width"
		use:onClickOutside={close}
		role="dialog"
		aria-modal="true"
		aria-labelledby="settings-heading"
		use:focusTrap
		use:scrollLock
		transition:fly={{ duration: 400, easing: cubicOut, y: -150 }}
	>
		<div class="content-padding">
			<h1 id="settings-heading">Settings</h1>

			<hr />

			<h2>Quiz</h2>
			<Checkbox
				id="retry-incorrect-answers-setting"
				bind:checked={$settings.retryIncorrectAnswers}
			>
				Put incorrect answers back in queue
			</Checkbox>

			<fieldset>
				<legend>Auto submit</legend>

				<Radio
					id="auto-commit-disabled-choice"
					name="auto-commit-choice"
					bind:group={$settings.autoCommit}
					value="disabled"
				>
					Disabled
				</Radio>

				<Radio
					id="auto-commit-forgiving-choice"
					name="auto-commit-choice"
					bind:group={$settings.autoCommit}
					value="forgiving"
				>
					On correct answer
				</Radio>

				<Radio
					id="auto-commit-strict-choice"
					name="auto-commit-choice"
					bind:group={$settings.autoCommit}
					value="strict"
				>
					On correct <strong>or</strong> incorrect answer
				</Radio>

				<input
					id="mistake-delay-setting"
					type="number"
					bind:value={$settings.mistakeDelayMs}
					min="0"
					step="10"
					max="5000"
					disabled={$settings.autoCommit !== "strict"}
					required
				/>
				<label for="mistake-delay-setting">Mistake delay (ms)</label>
			</fieldset>

			<hr />

			<h2>Appearance</h2>
			<Checkbox
				id="error-marker-setting"
				bind:checked={$settings.showErrorMarker}
			>
				Show an "X" if input does not match answer
			</Checkbox>

			<Checkbox
				id="progress-bar-setting"
				bind:checked={$settings.showProgressBar}
				>Show completion progress</Checkbox
			>

			<fieldset>
				<legend>Theme</legend>

				<Radio
					id="same-as-system-theme-choice"
					name="theme-choice"
					bind:group={$settings.theme}
					value="same-as-system"
				>
					Same as system ({$osTheme})
				</Radio>

				<Radio
					id="light-theme-choice"
					name="theme-choice"
					bind:group={$settings.theme}
					value="light">Light</Radio
				>

				<Radio
					id="dark-theme-choice"
					name="theme-choice"
					bind:group={$settings.theme}
					value="dark">Dark</Radio
				>
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
					tooltip="[value]%"
					width="200px"
					on:input={playTapSoundThrottled}
				/>
			</div>

			<hr />

			<h2>Danger zone</h2>
			<Checkbox id="reset-on-close-setting" bind:checked={resetOnClose}>
				Reset all saved data after closing settings
			</Checkbox>
		</div>

		<MenuBar class="content-padding glass-morphism contrast">
			<div class="menu">
				<Button on:click={close}>
					<Icon title="Left arrow" path={mdiArrowLeft} size="1.5em" />
					Done
				</Button>
			</div>
		</MenuBar>
	</section>
{/if}

<style lang="postcss">
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
		border-bottom-left-radius: 1em;
		border-bottom-right-radius: 1em;
		overflow-y: scroll;
		width: 100%;
		max-height: 85%;
		box-sizing: border-box;
		padding-bottom: 0;
	}

	@media screen and (max-width: 40em) {
		.settings-menu {
			max-height: 100%;
			border-radius: 0;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			transform: none;
		}
	}

	.settings-menu {
		:global(.checkbox),
		:global(.radio-button) {
			margin-left: 1em;
			margin-right: 1em;

			&:not(:last-child) {
				margin-bottom: 1.5em;
			}
		}
	}

	fieldset {
		appearance: none;
		margin: 0;
		padding: 0;
		border: 0;
	}

	legend {
		padding: 0;
		margin-bottom: 1em;
		font-size: 1.2em;
		font-weight: normal;
	}

	label {
		display: inline-block;
	}

	.volume-slider {
		display: flex;
		align-items: center;
		margin-bottom: 1em;

		> :global(:first-child) {
			margin-right: 0.5em;
		}
	}

	.menu > :global(.button .svg-icon) {
		margin-left: -0.5em;
	}
</style>
