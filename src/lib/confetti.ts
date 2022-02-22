import { randomInt } from "$/lib/random"
import { sleep } from "$/lib/util"
import c from "canvas-confetti"
import type { Options as ConfettiOptions } from "canvas-confetti"

type Options = Omit<ConfettiOptions, "disableForReducedMotion">

/**
 * `canvas-confetti`, but with defaults!
 */
export function confetti(options: Options): Promise<undefined> {
	return c({
		...options,
		disableForReducedMotion: true
	})
}

export async function confettiScreen() {
	function fire() {
		confetti({
			gravity: 3,
			spread: 60,
			particleCount: 25,
			startVelocity: 40,
			ticks: 300,
			origin: {
				x: randomInt(20, 80) / 100,
				y: randomInt(30, 50) / 100
			},
			decay: 0.925
		})
	}

	for (let index = 0; index < 3; index++) {
		fire()
		await sleep(400)
	}
}

export function confettiAtCoordinates(
	position: { x: number; y: number },
	options: Omit<Options, "origin">
): Promise<undefined> {
	const doc = document.documentElement
	const y = position.y / doc.clientHeight
	const x = position.x / doc.clientWidth

	return confetti({
		origin: { y, x },
		...options
	})
}
