<script lang="ts">
	import type { SummaryKana } from "$/stores/summary"
	import SummaryItem from "./SummaryItem.svelte"

	interface Props {
		items: SummaryKana[]
		fill?: boolean
		time?: boolean
		truncateAt?: number
	}

	let {
		items,
		fill = true,
		time = false,
		truncateAt = Infinity
	}: Props = $props()

	let expanded = $state(false)

	// "- 3" makes sure the amount of items truncated is longer than the button
	let shouldTruncate = $derived(truncateAt <= items.length - 3)
	let truncateIndex = $derived(
		shouldTruncate && expanded ? Infinity : truncateAt
	)
	let truncatedItems = $derived(items.slice(0, truncateIndex))
</script>

<div class="summary-box">
	{#each truncatedItems as item (item.kana)}
		<SummaryItem {time} {item} {fill} />
	{/each}
	{#if shouldTruncate}
		<button
			class="action-button"
			aria-pressed={expanded}
			title={expanded
				? "Hide expanded items"
				: `Display ${items.length - truncatedItems.length} hidden items`}
			onclick={() => (expanded = !expanded)}
		>
			{expanded
				? "show less"
				: `show ${items.length - truncatedItems.length} more`}
		</button>
	{/if}
</div>

<style lang="postcss">
	.summary-box {
		--gap: 0.75rem;

		margin-top: calc(-1 * var(--gap));
		margin-left: calc(-1 * var(--gap));
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		align-items: center;
	}

	.action-button {
		all: initial;
		display: inline;
		margin-top: var(--gap);
		margin-left: var(--gap);
		cursor: default;
		color: inherit;
		font-family: inherit;
		font-size: 0.9em;
		font-weight: 500;
		/* border-radius: var(--standard-border-radius); */

		&:hover {
			text-decoration: underline;
		}
		&:focus-visible {
			text-decoration: underline;
			background: var(--focus-color);
			color: var(--text-color-on-focus-color);
		}
	}
</style>
