import { AudioContext } from 'standardized-audio-context';

export const audioContext = new AudioContext();
export const gainNode = audioContext.createGain();

gainNode.gain.value = 0.5;
gainNode.connect(audioContext.destination);

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

export function createAudioBufferSourceNode(buffer: AudioBuffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  source.connect(gainNode);
  source.addEventListener('ended', () => {
    source.disconnect(gainNode);
  })

  return source;
}

export function detuneWithPlaybackRate(cents: number): number {
  const semitones = cents / 100;
  return 2 ** (semitones / 12)
}
