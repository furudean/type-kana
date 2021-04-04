<script lang="ts">
	import { isHiragana, isKatakana } from "wanakana"
	import type { SummaryKana } from "@/stores/summary"
	import { tooltip } from "./_Tooltip.svelte"

	export let items: SummaryKana[]
	export let fill = true
</script>

<div class="summary-box" class:fill>
	{#each items as item}
		<div
			class="summary-item"
			class:hiragana={isHiragana(item.kana)}
			class:katakana={isKatakana(item.kana)}
			use:tooltip={item}
			tabindex="0"
		>
			{item.kana}
			{#if item.incorrectTimes > 1}
				<span
					class="badge"
					aria-label="answered incorrectly {item.incorrectTimes} times"
					>x{item.incorrectTimes}</span
				>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	$gap: 1rem;

	.summary-box {
		margin-top: -$gap;
		margin-left: -$gap;
	}

	.summary-item {
		--border-size: 3px;

		display: inline-block;
		position: relative;
		margin-top: $gap;
		margin-left: $gap;
		font-size: 1.5em;
		line-height: 1;
		font-family: "M+ 2c";
		padding: calc(0.3em - var(--border-size));
		border-radius: var(--standard-border-radius);
		cursor: default;
		border: var(--border-size) solid transparent;
		transition: 70ms var(--standard-transition) color,
			70ms var(--standard-transition) border-color;

		&:focus {
			outline: none;
			border-color: var(--focus-color);
		}
	}

	.summary-box.fill {
		.hiragana {
			background: var(--accent-color);
			color: var(--text-color-on-accent-color);
		}
		.katakana {
			background: var(--secondary-accent-color);
			color: var(--text-color-on-accent-color);
		}
	}

	.summary-box:not(.fill) {
		.hiragana {
			border-color: var(--accent-color);
			color: var(--accent-color);
		}
		.katakana {
			border-color: var(--secondary-accent-color);
			color: var(--secondary-accent-color);
		}
		.hiragana,
		.katakana {
			&:focus {
				color: var(--focus-color);
				border-color: var(--focus-color);
			}
		}
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
</style>
