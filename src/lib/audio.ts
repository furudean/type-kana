import { settings } from "@/stores/settings";
import { randomArrayItem } from "./random";

export function playDropSound() {
  const audio = randomArrayItem([
    new Audio('./audio/drop_002.ogg'),
    new Audio('./audio/drop_003.ogg'),
  ]);
  audio.volume = 0.33;

  return audio.play();
}

export function playErrorSound() {
  const audio = new Audio('./audio/error_004.ogg');
  audio.volume = 0.33;

  return audio.play();
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
