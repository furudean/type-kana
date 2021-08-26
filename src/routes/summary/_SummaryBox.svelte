<script lang="ts">
	import type { SummaryKana } from "@/stores/summary"
	import SummaryItem from "./_SummaryItem.svelte"

	export let items: SummaryKana[]
	export let fill = true
	export let truncateAt = Infinity

	// "- 2" makes sure the amount of items truncated is longer than the button
	let isTruncated = items.length - 2 > truncateAt

	$: truncatedItems = items.slice(0, isTruncated ? truncateAt : Infinity)
</script>

<div class="summary-box">
	{#each truncatedItems as item (item.kana)}
		<SummaryItem {item} {fill} />
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
		--gap: 0.75rem;

		margin-top: calc(-1 * var(--gap));
		margin-left: calc(-1 * var(--gap));
		display: flex;
		flex-wrap: wrap;
		align-content: center;
	}

	.expand-button {
		all: initial;
		display: inline;
		margin-top: var(--gap);
		margin-left: var(--gap);
		cursor: default;
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
