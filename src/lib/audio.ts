const AudioContext = window.AudioContext ?? window.webkitAudioContext;

export const context = new AudioContext();
export const gainNode = context.createGain();

gainNode.connect(context.destination);

const audioCache = new Map<string, AudioBuffer>();

export async function getAudioBuffer(url: string): Promise<AudioBuffer> {
  if (audioCache.has(url)) {
    return audioCache.get(url)
  }

  const audio = await fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => context.decodeAudioData(buffer));

  audioCache.set(url, audio);

  return audio;
}

export async function createAudioBufferSourceNode(url: string): Promise<AudioBufferSourceNode> {
  const source = context.createBufferSource();
  source.buffer = await getAudioBuffer(url);

  source.connect(gainNode);
  source.addEventListener('ended', () => {
    source.disconnect(gainNode);
  })

  return source;
}
