<script lang="ts">
	import Column from "./_Column.svelte"
	import { gameConfig } from "@/stores/game-config"
	import Radio from "@/lib/Radio.svelte"
	import Button from "@/lib/Button.svelte"
	import Icon from "@/lib/Icon.svelte"
	import { mdiArrowRight } from "@mdi/js"
	import { dictionary } from "@/stores/dictionary"
	import { onMount, tick } from "svelte"
	import {
		loadCheckboxSelectSound,
		loadDropSound,
		playDropSound
	} from "@/lib/sound"
	import { quiz } from "@/stores/quiz"
	import { browser } from "$app/env"

	let menuElement: HTMLElement
	let menuHeight = 0
	let menuIsSticky = false

	function updateMenuHeight() {
		menuHeight = menuElement.offsetHeight
	}

	function updateMenuSticky() {
		const bottomOfMenuY =
			Math.ceil(window.scrollY + menuElement.getBoundingClientRect().top) +
			menuElement.offsetHeight
		menuIsSticky = document.documentElement.scrollHeight > bottomOfMenuY
	}

	onMount(async () => {
		if (browser) {
			loadCheckboxSelectSound()
			loadDropSound()
			await tick()
			updateMenuHeight()
			window.requestAnimationFrame(updateMenuSticky) // run after menu height has been painted
		}
	})

</script>

<svelte:head>
	<title>Setup · Type Kana</title>
</svelte:head>

<svelte:window
	on:resize|passive={() => {
		updateMenuHeight()
		window.requestAnimationFrame(updateMenuSticky)
	}}
	on:scroll|passive={updateMenuSticky}
/>

<fieldset class="kana-type">
	<legend>I want to practice...</legend>
	<div class="radio-buttons">
		<Radio
			id="kana-type-hiragana-choice"
			name="kana-type"
			bind:group={$gameConfig.kanaType}
			value="hiragana">Hiragana</Radio
		>
		<Radio
			id="kana-type-katakana-choice"
			name="kana-type"
			bind:group={$gameConfig.kanaType}
			value="katakana">Katakana</Radio
		>
		<Radio
			id="kana-type-both-choice"
			name="kana-type"
			bind:group={$gameConfig.kanaType}
			value="both">Both</Radio
		>
	</div>
</fieldset>
<section class="columns">
	<Column bind:rows={$gameConfig.monographs} label="Monographs" />
	<Column
		bind:rows={$gameConfig.monographsDiacritics}
		label="Monographs with diacritics"
	/>
	<Column bind:rows={$gameConfig.digraphs} label="Digraphs" />
	<Column
		bind:rows={$gameConfig.digraphsDiacritics}
		label="Digraphs with diacritics"
	/>
</section>
<div class="menu-push" aria-hidden="true" style={`height: ${menuHeight}px`} />
<section class="menu" class:is-sticky={menuIsSticky} bind:this={menuElement}>
	<Button
		href="session"
		disabled={$dictionary.length === 0}
		on:click={() => {
			playDropSound()
			quiz.reset()
		}}
	>
		Start quiz
		<Icon title="Right arrow" path={mdiArrowRight} size="1.5em" />
	</Button>
</section>

<style lang="postcss">
	.kana-type legend {
		margin-bottom: 1em;
	}

	.radio-buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}
	.radio-buttons > :global(:not(:last-child)) {
		margin-right: 2em;
	}

	.columns {
		display: grid;
		grid-template-areas:
			"a b c"
			"a . d";
		/*  As of writing, 'grid-template-rows: masonry;' is experimental, and only
      renders in firefox with 'layout.css.grid-template-masonry-value.enabled'.
      This gracefully degrades to a slightly worse-looking version on
      unsupported browsers. */
		grid-template-rows: masonry;
		column-gap: 3em;
		padding: 0 2em;
		justify-content: center;
		margin-top: 3em;
	}
	.columns > :global(*) {
		&:nth-child(1) {
			grid-area: a;
		}
		&:nth-child(2) {
			grid-area: b;
		}
		&:nth-child(3) {
			grid-area: c;
		}
		&:nth-child(4) {
			grid-area: d;
		}
	}

	@media screen and (max-width: 978px) {
		.columns {
			grid-template-areas:
				"a c"
				"a d"
				"b .";
		}

		.menu-push {
			display: block !important;
		}
		.menu {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			transition: 250ms border-color var(--standard-curve);
			padding: 2em 0;
			margin-bottom: 0 !important;
		}
		.menu.is-sticky {
			border-color: var(--background-contrast-light);
		}
	}

	@media screen and (max-width: 638px) {
		.columns {
			grid-template-areas:
				"a"
				"b"
				"c"
				"d";
		}
	}

	fieldset {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		margin-top: 2em;
		justify-content: center;
	}

	legend {
		padding: 0;
		font-weight: 500;
		font-size: 1.2em;
		text-align: center;
		width: 100%;
	}

	.menu-push {
		display: none;
	}

	.menu {
		--border-size: 3px;

		display: flex;
		justify-content: center;
		margin-top: calc(-1 * var(--border-size));
		margin-bottom: 2em;
		background-color: var(--background-color);
		border-top: var(--border-size) solid transparent;
	}

	.menu > :global(.button .svg-icon) {
		margin-right: -0.5em;
	}

</style>
