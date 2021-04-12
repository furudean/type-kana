import confetti from "canvas-confetti"

export function celebrate() {
	confetti({
		disableForReducedMotion: true,
		origin: { y: 0.6 },
		gravity: 1.4,
		spread: 50,
		ticks: 400,
		particleCount: 90,
		startVelocity: 80
	})
}
