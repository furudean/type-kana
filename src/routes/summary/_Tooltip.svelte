<script context="module" lang="ts">
	import { writable } from "svelte/store"
	import { fade } from "svelte/transition"
	import { cubicOut } from "svelte/easing"
	import { getAnswers } from "@/lib/answer"
	import type { SummaryKana } from "@/stores/summary"
	import Icon from "@/lib/Icon.svelte"
	import { mdiClose as errorIcon } from "@mdi/js"

	// modified from https://github.com/stephane-vanraes/renderless-svelte/blob/master/src/Tooltip.svelte

	const focused = writable<SummaryKana>(null)
	const rect = writable<DOMRect>(null)

	export function tooltip(node: HTMLElement, item: SummaryKana) {
		function enter() {
			document.addEventListener("scroll", updateRect)
			window.addEventListener("resize", updateRect)

			focused.set(item)
			updateRect()
		}

		function leave() {
			document.removeEventListener("scroll", updateRect)
			window.removeEventListener("resize", updateRect)

			focused.set(null)
		}

		function updateRect() {
			rect.set(node.getBoundingClientRect())
		}

		node.addEventListener("mouseenter", enter)
		node.addEventListener("mouseleave", leave)
		node.addEventListener("focus", enter)
		node.addEventListener("blur", leave)

		return {
			destroy() {
				leave()
			},
			update(_item: SummaryKana) {
				focused.set(_item)
			}
		}
	}
</script>

<script lang="ts">
	import { clamp, uniqArray } from "@/lib/util"
	import { afterUpdate } from "svelte"

	function listWrongAnswers(item: SummaryKana): string {
		const answers = getAnswers(item.kana)
		return uniqArray(item.answers)
			.filter((s) => !answers.includes(s)) // only wrong answers
			.map((s) => (s.trim() === "" ? "<empty>" : `'${s}'`))
			.join(", ")
	}

	function calculateArrowStyle(el: DOMRect) {
		const top = window.scrollY + el.y + el.height
		const left = window.scrollX + el.x + el.width / 2

		return `top: ${top}px; left: ${left}px;`
	}

	function calculateBodyStyle(el: DOMRect, self: DOMRect) {
		const top = window.scrollY + el.y + el.height + 6
		const left = clamp(
			0,
			window.scrollX + el.x + el.width / 2 - self.width / 2,
			document.body.offsetWidth - self.width
		)

		return `top: ${top}px; left: ${left}px;`
	}

	let tooltipBody: HTMLElement
	let arrowStyle: string
	let bodyStyle: string

	// $: console.log("focused", $focused)
	// $: console.log("rect", $rect)

	afterUpdate(() => {
		if (tooltipBody && $rect) {
			arrowStyle = calculateArrowStyle($rect)
			bodyStyle = calculateBodyStyle($rect, tooltipBody.getBoundingClientRect())
		}
	})
</script>

{#if $focused}
	<div
		class="tooltip"
		out:fade={{ duration: 200, delay: 400, easing: cubicOut }}
	>
		<div class="arrow" style={arrowStyle} aria-hidden="true" />
		<div
			class="body"
			style={bodyStyle}
			aria-live="assertive"
			aria-atomic="true"
			bind:this={tooltipBody}
		>
			<strong>{getAnswers($focused.kana).join(", ")}</strong>
			{#if $focused.incorrectTimes > 0}
				<br />
				<Icon
					title="Incorrect answers"
					size="1.1em"
					color="var(--highlight-color)"
					path={errorIcon}
				/>
				<span class="error">{listWrongAnswers($focused)}</span>
			{/if}
		</div>
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		z-index: 1;
		width: 100%;
	}

	.arrow {
		position: absolute;
		width: 0;
		height: 0;
		border-width: 0 6px 6px 6px;
		border-style: solid;
		border-color: transparent transparent var(--background-color-inverse)
			transparent;
		transform: translateX(-50%);
		transition: 60ms var(--standard-curve) top, 60ms var(--standard-curve) left;
	}

	.body {
		position: absolute;
		background: var(--background-color-inverse);
		color: var(--text-color-inverse);
		padding: 0.2em 0.6em;
		border-radius: var(--standard-border-radius);
		user-select: none;
		font-size: 0.9em;
		letter-spacing: 1px;
		line-height: 1.25;
		text-align: center;
		box-sizing: border-box;
		min-width: 32px;
		max-width: 15em;
		transition: 60ms var(--standard-curve) top, 60ms var(--standard-curve) left;
	}

	.body :global(.svg-icon) {
		top: 2px; /* visual balance */
	}

	.error {
		text-decoration-color: var(--highlight-color);
		text-decoration-style: dotted;
		text-decoration-line: underline;
		font-weight: 500;
	}

	.error:not(:last-of-type)::after {
		content: ",";
	}
</style>
