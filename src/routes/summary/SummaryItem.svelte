<script lang="ts">
	import type { SummaryKana } from "$/stores/summary"
	import { isHiragana, isKatakana } from "wanakana"
	import { tooltip } from "./Tooltip.svelte"
	import { prettyTime } from "$lib/util"
	import { font } from "$/stores/font"

	interface Props {
		item: SummaryKana
		fill?: boolean
		time?: boolean
	}

	let { item, fill = false, time = false }: Props = $props()
</script>

<div class="summary-container">
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="summary-item"
		class:hiragana={isHiragana(item.kana)}
		class:katakana={isKatakana(item.kana)}
		class:fill
		role="img"
		tabindex="0"
		use:tooltip={!time ? item : undefined}
		style="font-family: {$font === 'random'
			? 'Noto Sans JP'
			: $font}, sans-serif; font-weight: 400;"
		lang="ja-JP"
		translate="no"
	>
		{item.kana}
		{#if item.incorrectTimes > 1}
			<span
				class="badge"
				aria-label="answered incorrectly {item.incorrectTimes} times"
			>
				x{item.incorrectTimes}
			</span>
		{/if}
	</div>
	{#if time}
		<div
			class="summary-time"
			style="font-family: {$font === 'random'
				? 'Noto Sans JP'
				: $font}, sans-serif; font-weight: 400;"
		>
			{prettyTime(item.duration / 1000)}
		</div>
	{/if}
</div>

<style lang="postcss">
	.summary-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.summary-item {
		--border-size: 3px;

		/* Reset button styles */
		background: none;
		border: none;
		padding: 0;
		margin: 0;

		display: inline-block;
		position: relative;
		margin-top: var(--gap);
		margin-left: var(--gap);
		font-size: 1.5em;
		line-height: 1;
		padding: 0.2em;
		border-radius: var(--standard-border-radius);
		cursor: default;
		user-select: none;
		border: var(--border-size) solid transparent;
		transition:
			75ms var(--standard-curve) color,
			75ms var(--standard-curve) border-color;

		&:focus-visible {
			border-color: var(--focus-color);
		}
	}

	.summary-time {
		margin-top: var(--gap);
		margin-left: 1em;
		line-height: 1;
		color: var(--text-color);
	}

	.badge {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 0.15em 0.2em;
		transform: translate(50%, 50%);
		border-radius: 9999px;
		background: var(--background-color);
		font-family: inherit;
		font-size: 0.6em;
		font-weight: 500;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		user-select: none;
	}

	.fill {
		&.hiragana {
			background: var(--accent-color);
			color: var(--text-color-on-accent-color);
		}
		&.katakana {
			background: var(--secondary-accent-color);
			color: var(--text-color-on-secondary-accent-color);
		}
	}

	:not(.fill) {
		&.hiragana {
			border-color: var(--accent-color);
			color: var(--accent-color);
		}
		&.katakana {
			border-color: var(--secondary-accent-color);
			color: var(--secondary-accent-color);
		}
		&.hiragana,
		&.katakana {
			&:focus-visible {
				color: var(--focus-color);
				border-color: var(--focus-color);
			}
		}
	}
</style>
