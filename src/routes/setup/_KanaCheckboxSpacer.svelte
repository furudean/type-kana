<script lang="ts">
	export let item: KanaCheckbox | null
	export let fill = false
	import { font } from "$/stores/font"

	let randomFont = "Noto Sans JP"

	// Generate random font for this specific component instance
	$: if ($font === "random") {
		randomFont = (Math as any).random() < 0.5 ? "Noto Sans JP" : "Hina Mincho"
	}
</script>

<div
	class="checkbox-kana spacer"
	class:fill
	aria-hidden="true"
	style="font-family: {$font === 'random'
		? randomFont
		: $font}, sans-serif !important; font-weight: 400 !important;"
>
	<span>{item?.kana ?? "あ"}</span>
</div>

<style>
	.spacer {
		font-size: 1.5em;
		border: 3px solid var(--text-color-lighter);
		border-radius: var(--standard-border-radius);
		padding: 0.25em;
		line-height: 1;
		height: 1em;
		opacity: 0.4;
		flex-grow: 1;
		box-sizing: content-box;
	}

	.spacer.fill {
		background: var(--text-color-lighter);
	}

	span {
		visibility: hidden;
	}
</style>
