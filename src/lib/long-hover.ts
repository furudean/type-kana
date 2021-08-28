export interface LongHoverOptions {
	delay: number
	start: () => void
	end?: () => void
	enabled?: boolean
}

export function longHover(
	node: HTMLElement,
	{ delay, start, end, enabled }: LongHoverOptions
) {
	end = end ?? (() => {})
	enabled = enabled ?? false

	let timeout: NodeJS.Timeout
	let active = false
	let hasAttention = false

	function enter() {
		if (!enabled) return
		timeout = setTimeout(() => {
			if (!hasAttention) return
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

	function userEnter() {
		hasAttention = true
		enter()
	}

	function userLeave() {
		hasAttention = false
		leave()
	}

	node.addEventListener("mouseenter", userEnter)
	node.addEventListener("mouseleave", userLeave)
	node.addEventListener("focus", userEnter)
	node.addEventListener("blur", userLeave)

	return {
		destroy() {
			leave()
		},
		update(options: LongHoverOptions) {
			delay = options.delay
			start = options.start
			end = options.end
			enabled = options.enabled

			leave()

			if (hasAttention) {
				enter()
			}
		}
	}
}
