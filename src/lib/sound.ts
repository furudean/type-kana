import { randomArrayItem, randomInt } from "./random";
import { createAudioBufferSourceNode } from "./audio";

export async function playProgressSound(mod: number) {
  try {
    const source = await createAudioBufferSourceNode('./audio/drop_002.ogg');
    let cents = Math.min(mod, 5) * 200;

    if (mod > 5) {
      cents += randomInt(0, 3) * 100
    }

    source.detune.value = cents;
    source.start();
  } catch (error) { }
}

export async function playErrorSound() {
  try {
    const source = await createAudioBufferSourceNode('./audio/error_004.ogg');
    if (source.detune) {
      source.detune.value = randomInt(-1, 2) * 200;
    }
    source.start();

  } catch (error) { }
}

export function playMaximizeSound() {
  const audio = new Audio('./audio/maximize_008.ogg');
  audio.volume = 0.5;

  return audio.play();
}

export function playMinimizeSound() {
  const audio = new Audio('./audio/minimize_008.ogg');
  audio.volume = 0.5;

  return audio.play();
}
