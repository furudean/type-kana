import { AudioContext } from "standardized-audio-context"
import type { GainNode } from "standardized-audio-context"

let audioContext: AudioContext
let interfaceGain: GainNode<AudioContext>
let voiceGain: GainNode<AudioContext>

export function getAudioContext() {
	if (!audioContext) {
		audioContext = new AudioContext()
	}
	return audioContext
}

export function getInterfaceGain() {
	if (!interfaceGain) {
		const ctx = getAudioContext()
		interfaceGain = ctx.createGain()
		interfaceGain.connect(ctx.destination)
	}
	return interfaceGain
}

export function getVoiceGain() {
	if (!voiceGain) {
		const ctx = getAudioContext()
		voiceGain = ctx.createGain()
		voiceGain.connect(ctx.destination)
	}
	return voiceGain
}

const audioCache = new Map<string, AudioBuffer>()

/** Fetches and caches an audio file */
export async function getAudioBuffer(
	urls: string | string[]
): Promise<AudioBuffer> {
	const urlsArray = typeof urls === "string" ? [urls] : urls
	const cachedUrl = urlsArray.find((url) => audioCache.has(url))

	if (cachedUrl) {
		return audioCache.get(cachedUrl)
	}

	for (const url of urlsArray) {
		console.debug(`Fetching audio at url ${url}`)
		const buffer = await fetch(url).then((response) => response.arrayBuffer())

		try {
			const audioBuffer = await getAudioContext().decodeAudioData(buffer)

			audioCache.set(url, audioBuffer)

			return audioBuffer
		} catch (error) {
			console.warn(
				`Failed to decode "${url}". The format is probably unsupported on this browser.`
			)
		}
	}
	throw new Error(`No more urls to try: ${urlsArray.join(", ")}`)
}

export function createAudioSource(
	buffer: AudioBuffer,
	gainNode = getInterfaceGain()
) {
	const source = getAudioContext().createBufferSource()
	source.buffer = buffer

	source.connect(gainNode)

	return source
}

/** Creates a gain node that is relative to root gain */
export function createGainNode() {
	const gainNode = getAudioContext().createGain()

	gainNode.connect(getInterfaceGain())

	return gainNode
}

export function detuneWithPlaybackRate(cents: number): number {
	const semitones = cents / 100
	return 2 ** (semitones / 12)
}

/**
 * Returns a function that can be called to preload the audio from the
 * parameters.
 *
 * If parameter is an array, it will attempt to preload urls in series until an
 * audio is successfully decoded.
 */
export function createPreloader(...urls: string[] | string[][]) {
	return async () => {
		await Promise.all(urls.map(getAudioBuffer))
	}
}
