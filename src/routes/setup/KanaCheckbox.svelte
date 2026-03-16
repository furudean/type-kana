<script lang="ts">
	import { getAnswers } from "$/lib/answer"
	import { gameConfig } from "$/stores/game-config"
	import { toKatakana } from "wanakana"
	import { playCheckboxSelectSound } from "$/lib/sound"
	import { longHover } from "$/lib/long-hover"
	import { fade } from "svelte/transition"
	import { cubicOut } from "svelte/easing"
	interface Props {
		item: KanaCheckbox;
		onchange?: (item: KanaCheckbox) => void;
		rowIndex: number;
		rowLength: number;
		animationDelay?: number;
		onanimationFinished?: () => void;
	}

	let {
		item,
		onchange,
		rowIndex,
		rowLength,
		animationDelay = 0,
		onanimationFinished
	}: Props = $props();

	let isLongHover = $state(false)

	const enableHover = () => (isLongHover = true)
	const disableHover = () => (isLongHover = false)

	let kanaType = $derived($gameConfig.kanaType)
	let showPopover = $derived(kanaType === "both" && item.checked)
	let style = $derived(animationDelay
		? `animation-delay: ${animationDelay}ms; transition-delay: ${animationDelay}ms`
		: null)

	function transitionEnd(event: TransitionEvent) {
		event.stopPropagation()

		// One transition event is fired per modified property. We want to make
		// sure to only catch one of these per animation cycle
		if (event.propertyName === "background-color") {
			onanimationFinished?.()
		}
	}

	function animationEnd(event: AnimationEvent) {
		event.stopPropagation()

		if (kanaType !== "both") {
			onanimationFinished?.()
		}
	}
</script>

<button
	class="checkbox-kana kana-font"
	role="checkbox"
	class:selected={item.checked}
	class:long-hover={isLongHover && kanaType === "both"}
	class:extended-click-area={kanaType === "both" && item.checked}
	class:wide={item.kana === "ん"}
	aria-checked={item.checked}
	title={`Select '${getAnswers(item.kana)[0]}'`}
	{style}
	onclick={() => {
		const newChecked = !item.checked
		onchange?.({ ...item, checked: newChecked })
		playCheckboxSelectSound(rowIndex, rowLength, newChecked)
	}}
	use:longHover={{
		delay: 500,
		start: enableHover,
		end: disableHover,
		enabled: showPopover
	}}
>
	<div class="effect" aria-hidden="true">
		<div
			class="block base"
			class:hiragana={kanaType === "hiragana"}
			class:katakana={["katakana", "both"].includes(kanaType)}
			ontransitionend={transitionEnd}
			ontransitioncancel={transitionEnd}
			lang="ja-JP"
			translate="no"
		>
			{["katakana", "both"].includes(kanaType)
				? toKatakana(item.kana)
				: item.kana}
		</div>
		{#if showPopover}
			<div
				class="block hiragana popover"
				onanimationend={animationEnd}
				out:fade={{
					duration: 125,
					delay: animationDelay,
					easing: cubicOut
				}}
				lang="ja-JP"
				translate="no"
			>
				{item.kana}
			</div>
		{/if}
	</div>
</button>

<style lang="postcss">
	.checkbox-kana {
		--border-width: 3px;

		/* Reset button styles */
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;

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
		animation-delay: inherit;
		transition-delay: inherit;
	}

	.checkbox-kana:active .effect {
		transform: translateY(8%) scale(110%, 90%);
	}

	.checkbox-kana.wide:active .effect {
		transform: translateY(8%) scale(104%, 90%);
	}

	.block {
		--transition: 125ms var(--standard-curve) color,
			125ms var(--standard-curve) background,
			125ms var(--standard-curve) border-color;

		color: var(--text-color-light);
		background: var(--background-color);
		border: var(--border-width) solid var(--text-color-lighter);
		border-radius: var(--standard-border-radius);
		transition: var(--transition);
		padding: 0.25em;
		text-align: center;
		transition-delay: inherit;
	}

	.checkbox-kana.selected .block {
		border-color: transparent;

		&.hiragana {
			color: var(--text-color-on-accent-color);
			background: var(--accent-color);
		}
		&.katakana {
			color: var(--text-color-on-secondary-accent-color);
			background: var(--secondary-accent-color);
		}
	}

	@keyframes drop {
		0% {
			transform: translateY(-75%) scale(90%, 80%);
			z-index: 1;
			opacity: 1;
		}
		50% {
			transform: translateY(20%) scale(105%, 85%);
		}
		100% {
			transform: none;
			opacity: 1;
		}
	}

	.block.popover {
		pointer-events: none;
		position: absolute;
		top: -4px;
		left: -4px;
		right: 4px;
		bottom: 4px;

		/* opacity is overwritten by animation */
		opacity: 0;

		animation-name: drop;
		animation-duration: 125ms;
		animation-timing-function: var(--deceleration-curve);
		animation-fill-mode: forwards;
		animation-delay: inherit;
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
		opacity: 1;
		animation: none;
		animation-name: flip;
		animation-duration: 125ms;
		animation-timing-function: var(--deceleration-curve);
		animation-fill-mode: forwards;
	}

	.checkbox-kana:not(.selected):focus-visible .block {
		color: var(--focus-color);
		border-color: var(--focus-color);
		transition: var(--transition), 75ms var(--standard-curve) color,
			75ms var(--standard-curve) border-color;
	}

	.checkbox-kana.selected:focus-visible .block {
		border-color: var(--focus-color);
		transition: var(--transition), 75ms var(--standard-curve) border-color;
	}
</style>
