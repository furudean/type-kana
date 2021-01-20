import { AudioContext } from 'standardized-audio-context';
import { settings } from "@/stores/settings";

export const audioContext = new AudioContext();
export const rootGainNode = audioContext.createGain();

rootGainNode.connect(audioContext.destination);

// set audio volume depending on settings
settings.subscribe($settings => {
  rootGainNode.gain.value = $settings.audioEnabled ? 0.5 : 0;
});

const audioCache = new Map<string, AudioBuffer>();

export async function getAudioBuffer(urls: string | string[]): Promise<AudioBuffer> {
  const urlsArray = typeof urls === "string" ? [urls] : urls;
  const cachedUrl = urlsArray.find(url => audioCache.has(url));

  if (cachedUrl) {
    return audioCache.get(cachedUrl);
  }

  for (const url of urlsArray) {
    console.debug(`Fetching audio at url ${url}`)
    const buffer = await fetch(url)
      .then(response => response.arrayBuffer())
    try {
      const audioBuffer = await audioContext.decodeAudioData(buffer);
      audioCache.set(url, audioBuffer);
      return audioBuffer;
    } catch (error) {
      console.warn(`Failed to decode "${url}". The format is probably unsupported on this browser.`)
    }
  }
  throw new Error(`No more urls to try: ${urlsArray.join(', ')}`)
}

export function createAudioBufferSourceNode(
  buffer: AudioBuffer,
  gainNode = rootGainNode
) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  source.connect(gainNode);
  source.addEventListener('ended', () => {
    source.disconnect(gainNode);
  })

  return source;
}

export function createGainNode() {
  const gainNode = audioContext.createGain();

  gainNode.connect(rootGainNode);

  return gainNode;
}

export function detuneWithPlaybackRate(cents: number): number {
  const semitones = cents / 100;
  return 2 ** (semitones / 12)
}
