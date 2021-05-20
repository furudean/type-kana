<script lang="ts">
	import { isHiragana, isKatakana } from "wanakana"
	import type { SummaryKana } from "@/stores/summary"
	import { tooltip } from "./_Tooltip.svelte"

	export let items: SummaryKana[]
	export let fill = true
	export let truncateAt = Infinity

	// "- 2" makes sure the amount of items truncated is longer than the button
	let isTruncated = items.length - 2 > truncateAt

	$: truncatedItems = items.slice(0, isTruncated ? truncateAt : Infinity)

</script>

<div class="summary-box" class:fill>
	{#each truncatedItems as item}
		<div
			class="summary-item"
			class:hiragana={isHiragana(item.kana)}
			class:katakana={isKatakana(item.kana)}
			tabindex="0"
			use:tooltip={item}
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
	{/each}
	{#if isTruncated}
		<button
			class="expand-button"
			title="Show remaining items"
			on:click={() => (isTruncated = false)}
		>
			...and {items.length - truncatedItems.length} more
		</button>
	{/if}
</div>

<style lang="postcss">
	.summary-box {
		--gap: 1rem;

		margin-top: calc(-1 * var(--gap));
		margin-left: calc(-1 * var(--gap));
		display: flex;
		flex-wrap: wrap;
		align-content: center;
	}

	.summary-item {
		--border-size: 3px;

		display: inline-block;
		position: relative;
		margin-top: var(--gap);
		margin-left: var(--gap);
		font-size: 1.5em;
		line-height: 1;
		font-family: "M+ 2c";
		padding: calc(0.3em - var(--border-size));
		border-radius: var(--standard-border-radius);
		cursor: default;
		border: var(--border-size) solid transparent;
		transition: 70ms var(--standard-curve) color,
			70ms var(--standard-curve) border-color;

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

	.expand-button {
		all: initial;
		display: inline;
		margin-top: var(--gap);
		margin-left: var(--gap);
		cursor: pointer;
		height: auto;
		color: inherit;
		font-family: inherit;
		font-size: 0.9em;
		font-weight: 500;
		line-height: 1;
		border-radius: var(--standard-border-radius);

		&:hover {
			text-decoration: underline;
		}
		&:focus {
			box-shadow: 0 0 0 3px var(--focus-color);
		}
	}

</style>
