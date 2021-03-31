<script lang="ts">
	import { getAnswers } from "@/lib/answer"
	import { gameConfig } from "@/stores/game-config"
	import { toKatakana } from "wanakana"
	import { playCheckboxSelectSound } from "@/lib/sound"

	$: kanaType = $gameConfig.kanaType

	export let item: KanaCheckbox
	export let rowIndex: number
	export let rowLength: number
</script>

<button
	class="checkbox-kana"
	role="checkbox"
	class:selected={item.checked}
	aria-pressed={item.checked}
	title={`Select '${getAnswers(item.kana)[0]}'`}
	on:click={() => {
		item.checked = !item.checked
		playCheckboxSelectSound(rowIndex, rowLength, item.checked)
	}}
>
	<div
		class="block"
		aria-hidden="true"
		class:hiragana={kanaType === "hiragana"}
		class:katakana={kanaType === "katakana" || kanaType === "both"}
	>
		{kanaType === "katakana" || kanaType === "both" ? toKatakana(item.kana) : item.kana}
	</div>
	{#if kanaType === "both" && item.checked}
		<div class="block hiragana popover" aria-hidden="true">
			{item.kana}
		</div>
	{/if}
</button>

<style lang="scss">
	$border-width: 3px;

	.checkbox-kana {
		font-family: "M+ 2c";
		appearance: none;
		font-size: 1.5em;
		outline: none;
		cursor: pointer;
		line-height: 1;
		white-space: nowrap;
		position: relative;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		user-select: none;
		transition: transform 50ms var(--standard-transition);
		flex-grow: 1; // grow to fill any remaining space (used for ん/ン)
	}

	.checkbox-kana:active {
		transform: translateY(10%);
	}

	.block {
		color: var(--text-color-light);
		background: var(--background-color);
		border: $border-width solid var(--text-color-lighter);
		border-radius: var(--standard-border-radius);
		transition: 150ms var(--standard-transition) color, 150ms var(--standard-transition) background,
			70ms var(--standard-transition) border-color;
		padding: 0.25em;
	}

	.checkbox-kana.selected > .block {
		color: var(--text-color-on-accent-color);
		border-color: transparent;

		&.hiragana {
			background: var(--accent-color);
		}
		&.katakana {
			background: var(--secondary-accent-color);
		}
	}

	@keyframes drop {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.block.popover {
		position: absolute;
		top: -4px;
		left: -4px;
		right: 4px;
		bottom: 4px;
		opacity: 0; // overwritten by animation
		animation-name: drop;
		animation-duration: 150ms;
		animation-delay: 150ms; // wait for main block to finish transition before dropping in
		animation-timing-function: var(--standard-transition);
		animation-fill-mode: forwards;
	}

	.checkbox-kana:hover > .block,
	.checkbox-kana:focus > .block {
		border-color: var(--focus-color);
	}
</style>
