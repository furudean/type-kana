import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock"

export function scrollLock(node: HTMLElement) {
	disableBodyScroll(node)

	return {
		destroy() {
			enableBodyScroll(node)
		}
	}
}
