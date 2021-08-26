export interface LongHoverSettings {
	delay: number
	start: () => void
	end?: () => void
}

export function longHover(
	node: HTMLElement,
	{ delay, start, end }: LongHoverSettings
) {
	end = end ?? (() => {})

	let timeout: NodeJS.Timeout
	let active = false

	function enter() {
		timeout = setTimeout(() => {
			active = true
			start()
		}, delay)
	}

	function leave() {
		clearTimeout(timeout)
		if (active) {
			active = false
			end()
		}
	}

	node.addEventListener("mouseenter", enter)
	node.addEventListener("mouseleave", leave)
	node.addEventListener("focus", enter)
	node.addEventListener("blur", leave)

	return {
		destroy() {
			leave()
		}
	}
}
