<script lang="ts">
	import type { SummaryKana } from "$/stores/summary"
	import { isHiragana, isKatakana } from "wanakana"

	export let items: SummaryKana[]

	$: numHiragana = items.filter(({ kana }) => isHiragana(kana)).length
	$: numKatakana = items.filter(({ kana }) => isKatakana(kana)).length
</script>

{#if numHiragana > 0}
	<span class="counter hiragana" title="{numHiragana} hiragana items">
		{numHiragana}
	</span>
{/if}

{#if numKatakana > 0}
	<span class="counter katakana" title="{numKatakana} katakana items">
		{numKatakana}
	</span>
{/if}

<style lang="postcss">
	.counter {
		display: inline-block;
		vertical-align: middle;
		font-size: 0.6em;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		text-align: center;
		padding: 0.25em 0.5em;
		border-radius: var(--standard-border-radius);
		white-space: nowrap;
	}

	.counter.hiragana {
		background: var(--accent-color);
		color: var(--text-color-on-accent-color);
	}

	.counter.katakana {
		background: var(--secondary-accent-color);
		color: var(--text-color-on-secondary-accent-color);
	}
</style>
