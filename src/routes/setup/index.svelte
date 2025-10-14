<script lang="ts">
	import Column from "./_Column.svelte"
	import { gameConfig } from "$/stores/game-config"
	import Radio from "$/components/Radio.svelte"
	import Button from "$/components/Button.svelte"
	import Icon from "$/components/MaterialIcon.svelte"
	import { mdiArrowRight, mdiArrowLeft, mdiHistory } from "@mdi/js"
	import { dictionary } from "$/stores/dictionary"
	import { onMount } from "svelte"
	import {
		loadCheckboxSelectSound,
		loadDropSound,
		playDropSound
	} from "$/lib/sound"
	import { quiz } from "$/stores/quiz"
	import { browser } from "$app/env"
	import MenuBar from "$/components/MenuBar.svelte"

	onMount(() => {
		if (browser) {
			loadCheckboxSelectSound()
			loadDropSound()
		}
	})
</script>

<svelte:head>
	<title>Setup · Type Kana</title>
</svelte:head>

<div class="wrapper">
	<fieldset class="kana-type">
		<legend>I want to practice...</legend>
		<div class="radio-buttons">
			<Radio
				id="kana-type-hiragana-choice"
				name="kana-type"
				bind:group={$gameConfig.kanaType}
				value="hiragana"
			>
				Hiragana
			</Radio>
			<Radio
				id="kana-type-katakana-choice"
				name="kana-type"
				bind:group={$gameConfig.kanaType}
				value="katakana"
			>
				Katakana
			</Radio>
			<Radio
				id="kana-type-both-choice"
				name="kana-type"
				bind:group={$gameConfig.kanaType}
				value="both"
			>
				Both
			</Radio>
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
	<MenuBar class="glass-morphism contrast">
		<div class="menu content-padding">
			<Button href="/" style="outline">
				<Icon path={mdiArrowLeft} size="1.25em" />
				Back
			</Button>
			<Button href="/history" style="outline">
				<Icon path={mdiHistory} size="1.25em" />
				History
			</Button>
			<Button
				href="session"
				disabled={$dictionary.length === 0}
				on:click={() => {
					playDropSound()
					quiz.reset()
				}}
			>
				Start quiz
				<Icon path={mdiArrowRight} size="1.25em" />
			</Button>
		</div>
	</MenuBar>
</div>

<style lang="postcss">
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

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

		> :global(*) {
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
			grid-template-areas:
				"a c"
				"a d"
				"b .";
		}

		@media screen and (max-width: 638px) {
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

	.menu {
		display: flex;
		justify-content: center;
		gap: 1em;
	}

	.menu > :global(:nth-child(1) .svg-icon) {
		margin-left: -0.5em;
	}

	.menu > :global(:nth-child(2) .svg-icon) {
		margin-right: -0.5em;
	}
</style>
