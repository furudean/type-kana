import { randomInt } from "@/lib/random"
import { sleep } from "@/lib/util"
import confetti from "canvas-confetti"

function fire() {
	confetti({
		gravity: 3.5,
		spread: 50,
		particleCount: 30,
		startVelocity: 60,
		ticks: 100,
		origin: {
			x: randomInt(20, 80) / 100,
			y: randomInt(25, 40) / 100
		},
		disableForReducedMotion: true
	})
}

export async function celebrate() {
	for (let index = 0; index < 3; index++) {
		fire()
		await sleep(500)
	}
}
