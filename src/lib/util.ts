export async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

/** Returns a throttled version of `fn`, skipping calls that happen within
 * `ms` milliseconds. */
export function throttle<F extends Function>(fn: F, ms: number): F {
	let isWaiting = false

	return function (...args: any[]) {
		if (!isWaiting) {
			isWaiting = true

			fn.apply(this, args)

			setTimeout(() => {
				isWaiting = false
			}, ms)
		}
	} as any // Cast needed for compiler to not freak out
}

export function roundN(num: number, decimalPlaces: number): number {
	const factor = 10 ** (decimalPlaces + 2)
	return Math.round((num + Number.EPSILON) * factor) / factor
}

export function uniqBy<T>(array: T[], keyFn: (item: T) => string): T[] {
	const seen = new Set<string>()
	return array.filter((item) => {
		let key = keyFn(item)
		return seen.has(key) ? false : seen.add(key)
	})
}

export function uniqArray<T>(array: T[]): T[] {
	return [...new Set(array)]
}

export function clamp(min: number, num: number, max: number): number {
	return num <= min ? min : num >= max ? max : num
}
