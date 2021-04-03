<script context="module" lang="ts">
	import { writable } from "svelte/store"
	import { fade } from "svelte/transition"
	import { cubicOut } from "svelte/easing"
	import { getAnswers } from "@/lib/answer"
	import type { SummaryKana } from "@/stores/summary"

	// modified from https://github.com/stephane-vanraes/renderless-svelte/blob/master/src/Tooltip.svelte

	const item = writable<SummaryKana>(null)
	const dimensions = writable<DOMRect>(null)

	export function tooltip(node: HTMLElement, _item: SummaryKana) {
		function mouseover() {
			document.addEventListener("scroll", scroll)

			item.set(_item)
			dimensions.set(node.getBoundingClientRect().toJSON())
		}

		function mouseout() {
			document.addEventListener("scroll", scroll)
			item.set(null)
		}

		function scroll() {
			dimensions.set(node.getBoundingClientRect().toJSON())
		}

		node.addEventListener("mouseover", mouseover)
		node.addEventListener("mouseout", mouseout)

		return {
			destroy() {
				node.removeEventListener("mouseover", mouseover)
				node.removeEventListener("mouseout", mouseout)
				document.removeEventListener("scroll", scroll)

				item.set(null)
			},
			update(_item: SummaryKana) {
				item.set(_item)
			}
		}
	}
</script>

<script lang="ts">
	import { uniqArray } from "@/lib/util"

	function listWrongAnswers(item: SummaryKana): string {
		return uniqArray(item.answers)
			.filter((s) => !getAnswers(item.kana).includes(s)) // only wrong answers
			.map((s) => `"${s}"`)
			.join(", ")
	}

	function calculateStyle(dim: DOMRect) {
		const left = dim.x + dim.width / 2
		const top = dim.y + dim.height + 5

		return `left: ${left}px; top: ${top}px;`
	}

	$: style = $dimensions && calculateStyle($dimensions)
</script>

{#if $item}
	<div
		class="tooltip"
		{style}
		aria-live="assertive"
		aria-atomic="true"
		transition:fade={{ duration: 125, easing: cubicOut }}
	>
		<strong>{getAnswers($item.kana).join(", ")}</strong>
		{#if $item.incorrectTimes > 0}
			<br />
			you wrote: {listWrongAnswers($item)}
		{/if}
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		background: var(--background-color-inverse);
		color: var(--text-color-inverse);
		padding: 0.2em 0.5em;
		border-radius: var(--standard-border-radius);
		letter-spacing: 1px;
		line-height: 1.25;
		text-align: center;
		font-size: 90%;
		transform: translateX(-50%);
		user-select: none;
		box-sizing: border-box;
		min-width: 2em;
		max-width: 10em;
	}

	.tooltip::before {
		content: "";
		position: absolute;
		top: -8px;
		left: 50%;
		border-width: 4px;
		border-style: solid;
		border-color: transparent transparent var(--background-color-inverse)
			transparent;
		transform: translateX(-50%);
	}
</style>
