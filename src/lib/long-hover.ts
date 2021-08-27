export interface LongHoverSettings {
	delay: number
	start: () => void
	end?: () => void
	enabled?: boolean
}

export function longHover(node: HTMLElement, settings: LongHoverSettings) {
	let { delay, start, end, enabled } = settings
	enabled = enabled ?? false
	end = end ?? (() => {})

	let timeout: NodeJS.Timeout
	let active = false
	let hasAttention = false

	function enter() {
		if (enabled) {
			timeout = setTimeout(() => {
				active = true
				start()
			}, delay)
		}
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
		update(settings: LongHoverSettings) {
			delay = settings.delay
			start = settings.start
			end = settings.end
			enabled = settings.enabled

			if (active) {
				leave()
			}

			if (hasAttention) {
				enter()
			}
		}
	}
}
