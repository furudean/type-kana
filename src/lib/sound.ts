import { randomArrayItem, randomInt } from "./random";
import { createAudioBufferSourceNode, getAudioBuffer, detuneWithPlaybackRate } from "./audio";

export async function playProgressSound(mod: number) {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/drop_002.ogg',
    '/assets/audio/drop_002.mp3',
  ]);
  const source = await createAudioBufferSourceNode(audioBuffer);
  let cents = Math.min(mod, 5) * 100;

  if (mod > 5) {
    cents += randomInt(0, 3) * 100
  }

  // detune using playbackRate since AudioBufferSourceNode.detune has bad 
  // browser support
  source.playbackRate.value = detuneWithPlaybackRate(cents);
  source.start();
}

export async function playErrorSound() {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/error_004.ogg',
    '/assets/audio/error_004.mp3',
  ]);
  const source = createAudioBufferSourceNode(audioBuffer);
  source.playbackRate.value = detuneWithPlaybackRate(randomInt(-1, 2) * 200);

  source.start();
}

export async function playMaximizeSound() {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/maximize_008.ogg',
    '/assets/audio/maximize_008.mp3',
  ]);
  const source = createAudioBufferSourceNode(audioBuffer);

  source.start();
}

export async function playMinimizeSound() {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/minimize_008.ogg',
    '/assets/audio/minimize_008.mp3',
  ]);
  const source = createAudioBufferSourceNode(audioBuffer);

  source.start();
}
