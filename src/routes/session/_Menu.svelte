<script lang="ts">
	import { mdiCogOutline, mdiArrowLeft, mdiRestart, mdiCheck } from "@mdi/js"
	import Icon from "$/components/MaterialIcon.svelte"
	import { createEventDispatcher, onMount } from "svelte"
	import { loadDropSound, loadVictorySound, playDropSound } from "$/lib/sound"
	import { quiz } from "$/stores/quiz"

	const dispatch = createEventDispatcher()

	let isRestartAnimationPlaying = false

	function menuEvent(type: string) {
		dispatch("menuEvent", { type })
	}

	onMount(() => {
		loadDropSound()
	})
</script>

<section class="menu">
	<a href="setup" class="button" title="Go back" sveltekit:prefetch>
		<Icon path={mdiArrowLeft} />
	</a>

	<button
		type="button"
		class="button tilt"
		title="Open game settings"
		on:click={() => {
			menuEvent("openSettings")
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur()
			}
		}}
	>
		<span class="tilt-animation-container">
			<Icon path={mdiCogOutline} />
		</span>
	</button>

	<button
		type="button"
		class="button tilt"
		class:reset-animation-playing={isRestartAnimationPlaying}
		title="Restart quiz"
		on:click={() => {
			menuEvent("restart")
			playDropSound()
			isRestartAnimationPlaying = true
		}}
	>
		<span class="tilt-animation-container">
			<span
				class="reset-animation-container"
				on:animationend={() => {
					isRestartAnimationPlaying = false
				}}
			>
				<Icon path={mdiRestart} />
			</span>
		</span>
	</button>

	<a
		href="/summary"
		class="button"
		title="Finish session"
		on:mouseenter={() => {
			loadVictorySound()
		}}
	>
		<Icon path={mdiCheck} />
	</a>
</section>

<style lang="postcss">
	.menu {
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 3em;
	}

	.menu > * {
		margin: 0;
		margin-left: 0.75em;

		&:first-child {
			margin-left: 0;
		}
	}

	.button {
		all: initial;
		display: flex;
		font-size: 2.5em;
		margin-left: 0.25em;
		padding: 0.175em;
		border-radius: 50%;
		transition: transform 50ms var(--standard-curve),
			color 125ms var(--standard-curve),
			background-color 125ms var(--standard-curve),
			border-color 125ms var(--standard-curve);
		color: var(--accent-color);

		&:focus-visible {
			outline: none;
			color: var(--text-color-on-accent-color);
			background-color: var(--accent-color);
		}
		&:active {
			transform: translateY(8%) scale(110%, 90%);
		}
	}

	.button[href] {
		cursor: pointer;
	}

	.button span {
		display: flex;
	}

	.button.tilt {
		& .tilt-animation-container {
			transition: transform 150ms var(--standard-curve);
		}
		&:hover .tilt-animation-container,
		&:focus .tilt-animation-container {
			transform: rotate(-45deg);
		}
	}

	@keyframes counter-clockwise-turn {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-360deg);
		}
	}

	.button.reset-animation-playing .reset-animation-container {
		animation: 500ms counter-clockwise-turn var(--standard-curve);
	}
</style>
