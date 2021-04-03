<script lang="ts">
	import { isHiragana, isKatakana } from "wanakana"
	import type { SummaryKana } from "@/stores/summary"
	import { tooltip } from "./_Tooltip.svelte"

	export let items: SummaryKana[]
</script>

<div class="summary-box">
	{#each items as item}
		<div
			class="summary-item"
			class:hiragana={isHiragana(item.kana)}
			class:katakana={isKatakana(item.kana)}
			use:tooltip={item}
			tabindex="0"
		>
			{item.kana}
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
		margin-top: $gap;
		margin-left: $gap;
		font-size: 1.5em;
		line-height: 1;
		font-family: "M+ 2c";
		padding: calc(0.3em - var(--border-size));
		border-radius: var(--standard-border-radius);
		cursor: default;
		border: var(--border-size) solid transparent;
		transition: 70ms var(--standard-transition) border-color;

		&.hiragana {
			background: var(--accent-color);
			color: var(--text-color-on-accent-color);
		}
		&.katakana {
			background: var(--secondary-accent-color);
			color: var(--text-color-on-accent-color);
		}

		&:focus {
			outline: none;
			border-color: var(--focus-color);
		}
	}
</style>
