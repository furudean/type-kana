import confetti from "canvas-confetti"
import type { Options } from "canvas-confetti"

const particles = 150

function emit(particleRatio: number, opts: Options) {
	confetti({
		disableForReducedMotion: true,
		origin: { y: 0.4 },
		gravity: 1.3,
		ticks: 400,
		...opts,
		particleCount: Math.floor(particles * particleRatio)
	})
}

export function celebrate() {
	emit(0.25, {
		spread: 26,
		startVelocity: 50
	})
	emit(0.35, {
		spread: 100,
		decay: 0.91
	})
	emit(0.2, {
		spread: 80
	})
	emit(0.1, {
		spread: 120,
		startVelocity: 30,
		decay: 0.92
	})
	emit(0.1, {
		spread: 120,
		startVelocity: 60
	})
}
