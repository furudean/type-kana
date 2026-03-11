<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { onMount } from "svelte"
	import { scrollLock } from "$/lib/scoll-lock"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	interface Props {
		open?: boolean;
		children?: import('svelte').Snippet;
	}

	let { open = $bindable(false), children }: Props = $props();

	let dialog: HTMLDialogElement

	export function show() {
		open = true
		dialog.show()
	}

	export function showModal() {
		open = true
		dialog.showModal()
	}

	export function close() {
		open = false
		dialog.close()
	}

	function clickOutside(
		node: HTMLElement,
		callback: (event: MouseEvent) => void
	) {
		function click(event: MouseEvent) {
			if (event.target === node) {
				callback(event)
			}
		}

		document.addEventListener("click", click, true)

		return {
			destroy() {
				document.removeEventListener("click", click, true)
			}
		}
	}

	onMount(async () => {
		const dialogPolyfill = (await import("dialog-polyfill")).default

		dialogPolyfill.registerDialog(dialog)
	})
</script>

<dialog
	{open}
	bind:this={dialog}
	use:clickOutside={() => open && dispatch("clickoutside")}
	use:scrollLock
	onclose={bubble('close')}
>
	{@render children?.()}
</dialog>

<style lang="postcss">
	dialog {
		border: none;
		padding: 0;
		margin: 0;
		background: none;
		color: inherit;

		width: 100%;
		height: 100%;
		min-width: 100%;
		min-height: 100%;
	}

	dialog::backdrop {
		background-color: var(--backdrop-color);
	}

	dialog + :global(.backdrop) {
		background-color: var(--backdrop-color);
	}
</style>
