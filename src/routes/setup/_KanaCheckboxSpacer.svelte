<script lang="ts">
	export let item: KanaCheckbox | null
	export let fill = false
</script>

<div class="checkbox-kana spacer" class:fill aria-hidden="true">
	<span>{item?.kana ?? "あ"}</span>
</div>

<style>
	.spacer {
		font-family: "M+ 2c";
		font-size: 1.5em;
		border: 3px solid var(--text-color-lighter);
		border-radius: var(--standard-border-radius);
		padding: 0.25em;
		line-height: 1;
		height: 1em;
		opacity: 0.4;
		flex-grow: 1;
	}

	.spacer.fill {
		background: var(--text-color-lighter);
	}

	span {
		visibility: hidden;
	}
</style>
