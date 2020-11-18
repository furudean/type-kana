import { randomArrayItem, randomInt } from "./random";
import { createAudioBufferSourceNode, detuneWithPlaybackRate } from "./audio";

export async function playProgressSound(mod: number) {
  const source = await createAudioBufferSourceNode('./audio/drop_002.ogg');
  let cents = Math.min(mod, 5) * 200;

  if (mod > 5) {
    cents += randomInt(0, 3) * 100
  }

  // detune using playbackRate since AudioBufferSourceNode.detune has bad 
  // browser support
  source.playbackRate.value = detuneWithPlaybackRate(cents);
  source.start();
}

export async function playErrorSound() {
  const source = await createAudioBufferSourceNode('./audio/error_004.ogg');
  source.playbackRate.value = detuneWithPlaybackRate(randomInt(-1, 2) * 200);

  source.start();
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
