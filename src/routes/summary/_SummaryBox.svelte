<script lang="ts">
	import { isHiragana, isKatakana } from "wanakana"
	import type { SummaryKana } from "@/stores/summary"
	import { tooltip } from "renderless-svelte"

	export let items: SummaryKana[]
</script>

<div class="summary-box">
	{#each items as item}
		<div
			class="summary-item"
			class:hiragana={isHiragana(item.kana)}
			class:katakana={isKatakana(item.kana)}
			use:tooltip={{
				type: "summary-item",
				item
			}}
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
		display: inline-block;
		margin-top: $gap;
		margin-left: $gap;
		font-size: 1.5em;
		line-height: 1;
		font-family: "M+ 2c";
		padding: 0.25em;
		border-radius: var(--standard-border-radius);
		cursor: default;

		&.hiragana {
			background: var(--accent-color);
			color: var(--text-color-on-accent-color);
		}
		&.katakana {
			background: var(--secondary-accent-color);
			color: var(--text-color-on-accent-color);
		}
	}
</style>
