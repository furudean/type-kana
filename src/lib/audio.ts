import { AudioContext } from 'standardized-audio-context';

export const context = new AudioContext();
export const gainNode = context.createGain();

gainNode.gain.value = 0.5;
gainNode.connect(context.destination);

const audioCache = new Map<string, AudioBuffer>();

export async function getAudioBuffer(urls: string | string[]): Promise<AudioBuffer> {
  const urlsArray = typeof urls === "string" ? [urls] : urls;
  const cachedUrl = urlsArray.find(url => audioCache.has(url));
  if (cachedUrl) {
    return audioCache.get(cachedUrl);
  }

  for (const url of urlsArray) {
    try {
      const audio = await fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer));

      audioCache.set(url, audio);
      return audio;

    } catch (error) { }
  }
}

export function createAudioBufferSourceNode(buffer: AudioBuffer) {
  const source = context.createBufferSource();
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
