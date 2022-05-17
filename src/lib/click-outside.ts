export function clickOutsideDialog(
	node: HTMLElement,
	callback: (event: MouseEvent) => void
) {
	function click(event: MouseEvent) {
		if (!(event.target as HTMLElement).closest("form")) {
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
