import { randomArrayItem, randomInt } from "./random";
import { createAudioBufferSourceNode } from "./audio";

export async function playDropSound() {
  const source = randomArrayItem([
    await createAudioBufferSourceNode('./audio/drop_002.ogg'),
    await createAudioBufferSourceNode('./audio/drop_003.ogg'),
  ])
  source.detune.value = randomInt(-1, 2) * 100;
  source.start();
}

export async function playErrorSound() {
  const source = await createAudioBufferSourceNode('./audio/error_004.ogg');
  source.detune.value = randomInt(-1, 2) * 100;
  console.log(source.detune.value)
  source.start();
}

export function playMaximizeSound() {
  const audio = new Audio('./audio/maximize_006.ogg');
  audio.volume = 0.5;

  return audio.play();
}

export function playMinimizeSound() {
  const audio = new Audio('./audio/minimize_006.ogg');
  audio.volume = 0.5;

  return audio.play();
}
