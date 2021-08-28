<script lang="ts">
	import { getAnswers } from "@/lib/answer"
	import { gameConfig } from "@/stores/game-config"
	import { toKatakana } from "wanakana"
	import { playCheckboxSelectSound } from "@/lib/sound"
	import { longHover } from "@/lib/long-hover"

	export let item: KanaCheckbox
	export let rowIndex: number
	export let rowLength: number

	let isLongHover = false
	const enableHover = () => (isLongHover = true)
	const disableHover = () => (isLongHover = false)

	$: kanaType = $gameConfig.kanaType
</script>

<button
	class="checkbox-kana"
	role="checkbox"
	class:selected={item.checked}
	class:long-hover={isLongHover && kanaType === "both"}
	class:extended-click-area={kanaType === "both"}
	class:wide={item.kana === "ん"}
	aria-pressed={item.checked}
	title={`Select '${getAnswers(item.kana)[0]}'`}
	on:click={() => {
		item.checked = !item.checked
		playCheckboxSelectSound(rowIndex, rowLength, item.checked)
	}}
	use:longHover={{
		delay: 500,
		start: enableHover,
		end: disableHover,
		enabled: kanaType === "both" && item.checked
	}}
>
	<div class="effect" aria-hidden="true">
		<div
			class="block base"
			class:hiragana={kanaType === "hiragana"}
			class:katakana={kanaType === "katakana" || kanaType === "both"}
		>
			{kanaType === "katakana" || kanaType === "both"
				? toKatakana(item.kana)
				: item.kana}
		</div>
		{#if kanaType === "both" && item.checked}
			<div class="block hiragana popover">
				{item.kana}
			</div>
		{/if}
	</div>
</button>

<style lang="postcss">
	.checkbox-kana {
		--border-width: 3px;

		all: initial;
		font-family: "M+ 2c";
		font-size: 1.5em;
		line-height: 1;
		white-space: nowrap;
		position: relative;
		user-select: none;
		flex-grow: 1; /* grow to fill any remaining space. used for ん/ン. */
	}

	.checkbox-kana.extended-click-area::before {
		content: "";
		display: block;
		position: absolute;
		top: -4px;
		left: -4px;
		right: 4px;
		bottom: 4px;
		z-index: 1;
	}

	.effect {
		transition: transform 30ms var(--standard-curve);
	}

	.checkbox-kana:active .effect {
		transform: translateY(8%) scale(110%, 90%);
	}

	.checkbox-kana.wide:active .effect {
		transform: translateY(8%) scale(104%, 90%);
	}

	.block {
		color: var(--text-color-light);
		background: var(--background-color);
		border: var(--border-width) solid var(--text-color-lighter);
		border-radius: var(--standard-border-radius);
		transition: 90ms var(--standard-curve) color,
			90ms var(--standard-curve) background,
			75ms var(--standard-curve) border-color;
		padding: 0.25em;
		text-align: center;
	}

	.checkbox-kana.selected .block {
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
		0% {
			transform: translateY(-75%) scale(90%, 80%);
			z-index: 1;
		}
		50% {
			transform: translateY(20%) scale(105%, 85%);
		}
		100% {
			transform: none;
		}
	}

	.block.popover {
		pointer-events: none;
		position: absolute;
		top: -4px;
		left: -4px;
		right: 4px;
		bottom: 4px;
		animation-name: drop;
		animation-duration: 125ms;
		animation-timing-function: var(--deceleration-curve);
	}

	@keyframes flip {
		0% {
			transform: translateY(0);
			z-index: 1;
		}
		33% {
			transform: translateY(-50%) scale(90%, 80%);
			z-index: 1;
		}
		66% {
			transform: translateY(20%) scale(105%, 85%);
			z-index: -1;
		}
		100% {
			transform: none;
			z-index: -1;
		}
	}

	.checkbox-kana.long-hover .block.popover {
		animation: none;
		animation-name: flip;
		animation-duration: 125ms;
		/* animation-duration: 0.5s; */
		animation-timing-function: var(--deceleration-curve);
		animation-fill-mode: forwards;
	}

	.checkbox-kana:focus-visible .block {
		border-color: var(--focus-color);
	}
</style>
