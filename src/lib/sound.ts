import { randomInt } from "./random";
import {
  createAudioSource, getAudioBuffer, detuneWithPlaybackRate,
  createGainNode
} from "./audio";
import { sleep } from "@/lib/util";

function createPreloader(urls: string[]) {
  return async () => { await getAudioBuffer(urls) };
}

export const loadProgressSound = createPreloader([
  '/assets/audio/drop_002.ogg',
  '/assets/audio/drop_002.mp3',
]);

export async function playProgressSound(mod: number) {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/drop_002.ogg',
    '/assets/audio/drop_002.mp3',
  ]);
  const source = createAudioSource(audioBuffer);
  let cents = Math.min(mod, 5) * 100;

  if (mod > 5) {
    cents += randomInt(0, 3) * 100
  }

  // detune using playbackRate since AudioBufferSourceNode.detune has bad 
  // browser support
  source.playbackRate.value = detuneWithPlaybackRate(cents);
  source.start();
}

export const loadErrorSound = createPreloader([
  '/assets/audio/error_004.ogg',
  '/assets/audio/error_004.mp3',
]);

export async function playErrorSound() {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/error_004.ogg',
    '/assets/audio/error_004.mp3',
  ]);
  const source = createAudioSource(audioBuffer);
  source.playbackRate.value = detuneWithPlaybackRate(randomInt(-1, 2) * 200);

  source.start();
}

export const loadMaximizeSound = createPreloader([
  '/assets/audio/maximize_008.ogg',
  '/assets/audio/maximize_008.mp3',
]);

export async function playMaximizeSound() {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/maximize_008.ogg',
    '/assets/audio/maximize_008.mp3',
  ]);
  const source = createAudioSource(audioBuffer);

  source.start();
}

export const loadMinimizeSound = createPreloader([
  '/assets/audio/minimize_008.ogg',
  '/assets/audio/minimize_008.mp3',
]);

export async function playMinimizeSound() {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/minimize_008.ogg',
    '/assets/audio/minimize_008.mp3',
  ]);
  const source = createAudioSource(audioBuffer);

  source.start();
}

export const loadCheckboxSelectSound = createPreloader([
  '/assets/audio/click_002.ogg',
  '/assets/audio/click_002.mp3',
]);

export async function playCheckboxSelectSound(
  index: number,
  length: number,
  selected: boolean,
) {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/click_002.ogg',
    '/assets/audio/click_002.mp3',
  ]);

  const source = createAudioSource(audioBuffer);

  let cents = index * (600 / length)

  if (!selected) {
    cents -= 600
  }

  source.playbackRate.value = detuneWithPlaybackRate(cents);

  source.start();
}

export async function playCheckboxSelectSeriesSound(times: number, selected: boolean) {
  const gainNode = createGainNode();
  const offset = randomInt(-2, 2) * 100;

  async function createSource(i: number) {
    const audioBuffer = await getAudioBuffer([
      '/assets/audio/click_002.ogg',
      '/assets/audio/click_002.mp3',
    ]);
    const source = createAudioSource(audioBuffer, gainNode);

    source.playbackRate.value = detuneWithPlaybackRate(
      i * (600 / times) - offset
    );

    return source;
  }

  // TODO: this is ugly
  if (selected) {
    for (let i = 0; i < times; i++) {
      const source = await createSource(i);

      // slowly decrease volume over time
      gainNode.gain.value = 1 - (1 / times) * i;

      source.start();

      await sleep(400 / times);
    }
  } else {
    for (let i = times; i > 0; i--) {
      const source = await createSource(i);

      // slowly decrease volume over time
      gainNode.gain.value = (1 / times) * i;

      source.start();

      await sleep(400 / times);
    }
  }
}

export const loadTapSound = createPreloader([
  '/assets/audio/bong_001.ogg',
  '/assets/audio/bong_001.mp3',
]);

export async function playTapSound() {
  const audioBuffer = await getAudioBuffer([
    '/assets/audio/bong_001.ogg',
    '/assets/audio/bong_001.mp3',
  ]);
  const source = createAudioSource(audioBuffer);

  source.start();
}
