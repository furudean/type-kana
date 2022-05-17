<script lang="ts">
	import { settings } from "$/stores/settings"
	import { osTheme } from "$/stores/theme"
	import {
		loadTapSound,
		playMaximizeSound,
		playMinimizeSound,
		playTapSound
	} from "$/lib/sound"
	import { fade } from "svelte/transition"
	import { cubicOut } from "svelte/easing"
	import { onMount } from "svelte"
	import { clickOutsideDialog } from "$/lib/click-outside"
	import Button from "$/components/Button.svelte"
	import {
		mdiArrowLeft,
		mdiVolumeOff,
		mdiVolumeMedium,
		mdiVolumeHigh
	} from "@mdi/js"
	import Icon from "$/components/MaterialIcon.svelte"
	import Range from "$/components/Range.svelte"
	import { throttle } from "$/lib/util"
	import Checkbox from "$/components/Checkbox.svelte"
	import Radio from "$/components/Radio.svelte"
	import { scrollLock } from "$/lib/scoll-lock"
	import MenuBar from "$/components/MenuBar.svelte"
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"

	let volumeIconPath: string
	let volumeIconViewBox: string
	let volumeIconColor: string

	let dialog: HTMLDialogElement
	let resetOnClose = false

	const playTapSoundThrottled = throttle(playTapSound, 80)

	export function show(init = false) {
		dialog.showModal()

		!init && playMaximizeSound()
		location.hash !== "#settings" && goto($page.url.pathname + "#settings")
	}

	export function close() {
		dialog.close()

		if (resetOnClose) {
			localStorage.clear()
			sessionStorage.clear()
			location.href = "/"
		}
	}

	function onClose() {
		playMinimizeSound()
		location.hash === "#settings" && goto($page.url.pathname) // remove fragment
	}

	function onPopState() {
		if (location.hash === "#settings") {
			show()
		} else if (dialog.open) {
			close()
		}
	}

	$: {
		const vol = $settings.volume

		if (vol === 0) {
			volumeIconPath = mdiVolumeOff
			volumeIconViewBox = "0 0 24 24"
			volumeIconColor = "var(--highlight-color)"
		} else if (vol < 50) {
			volumeIconPath = mdiVolumeMedium
			volumeIconViewBox = "2 0 24 24"
			volumeIconColor = "currentColor"
		} else if (vol >= 50) {
			volumeIconPath = mdiVolumeHigh
			volumeIconViewBox = "0 0 24 24"
			volumeIconColor = "currentColor"
		}
	}

	onMount(async () => {
		const dialogPolyfill = (await import("dialog-polyfill")).default

		dialogPolyfill.registerDialog(dialog)
		loadTapSound()

		if (location.hash === "#settings") show(true)
	})
</script>

<svelte:window on:popstate={onPopState} />

<dialog
	class="content-width"
	aria-labelledby="settings-heading"
	bind:this={dialog}
	use:clickOutsideDialog={close}
	use:scrollLock
	on:close={onClose}
>
	<form method="dialog" on:submit|preventDefault={close}>
		<div class="content-padding">
			<h1 id="settings-heading">Settings</h1>

			<hr />

			<h2>Quiz</h2>

			<fieldset>
				<legend>Auto submit</legend>

				<Radio
					id="auto-commit-disabled-choice"
					name="auto-commit-choice"
					bind:group={$settings.autoCommit}
					value="disabled"
				>
					Never
				</Radio>

				<Radio
					id="auto-commit-forgiving-choice"
					name="auto-commit-choice"
					bind:group={$settings.autoCommit}
					value="forgiving"
				>
					If correct answer
				</Radio>

				<Radio
					id="auto-commit-strict-choice"
					name="auto-commit-choice"
					bind:group={$settings.autoCommit}
					value="strict"
				>
					Always
				</Radio>

				{#if $settings.autoCommit === "strict"}
					<div transition:fade={{ duration: 150, easing: cubicOut }}>
						<input
							id="mistake-delay-setting"
							type="number"
							bind:value={$settings.mistakeDelayMs}
							min="0"
							step="10"
							max="2000"
							required
						/>
						<label for="mistake-delay-setting">Mistake delay (ms)</label>
					</div>
				{/if}
			</fieldset>

			<Checkbox
				id="retry-incorrect-answers-setting"
				bind:checked={$settings.retryIncorrectAnswers}
			>
				Put incorrect answers back in queue
			</Checkbox>

			<Checkbox
				id="error-marker-setting"
				bind:checked={$settings.showErrorMarker}
			>
				Show an "X" if input does not match answer
			</Checkbox>

			<Checkbox
				id="progress-bar-setting"
				bind:checked={$settings.showProgressBar}
			>
				Show progress bar
			</Checkbox>

			<Checkbox id="confetti-setting" bind:checked={$settings.confetti}>
				Confetti on correct answer
			</Checkbox>

			<hr />

			<h2>Appearance</h2>

			<fieldset>
				<legend>Theme</legend>

				<Radio
					id="same-as-system-theme-choice"
					name="theme-choice"
					bind:group={$settings.theme}
					value="same-as-system"
				>
					System ({$osTheme[0].toUpperCase() + $osTheme.slice(1)})
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
					max={150}
					tooltip="[value]%"
					width="12rem"
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
				<Button type="submit">
					<Icon path={mdiArrowLeft} size="1.25em" />
					Done
				</Button>
			</div>
		</MenuBar>
	</form>
</dialog>

<style lang="postcss">
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	dialog {
		padding: 0;
		border: 0;
		margin: 0 auto;
		background: var(--background-color);
		color: inherit;
		border-bottom-left-radius: 2em;
		border-bottom-right-radius: 2em;
		overflow-y: scroll;
		width: 100%;
		max-height: 90%;
		animation: 200ms fade-in forwards;
	}

	dialog::backdrop {
		animation: 200ms fade-in forwards;
		background-color: var(--backdrop-color);
	}

	dialog + :global(.backdrop) {
		animation: 200ms fade-in forwards;
		background-color: var(--backdrop-color);
	}

	form {
		all: unset;
	}

	@media screen and (max-width: 40em) {
		dialog {
			max-height: 100%;
			border: none;
			border-radius: 0;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			transform: none;
		}
	}

	dialog {
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
		margin: 0;
		padding: 0 1em var(--line-space);
		border: 1px solid var(--text-color-lighter);
		margin-bottom: var(--line-space);
		border-radius: var(--standard-border-radius);
	}

	legend {
		font-size: 1.25em;
		padding: 0 0.5em;
		margin-bottom: 1em;
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
