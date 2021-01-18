import { writable } from 'svelte/store'

export interface GameSettings {
  autoCommit: 'lazy' | 'strict' | 'disabled';
  theme: 'light' | 'dark' | 'same-as-system';
  showErrorMarker: boolean;
  audioEnabled: boolean;
}

export const settings = writable<GameSettings>({
  // set defaults
  autoCommit: 'disabled',
  theme: 'same-as-system',
  showErrorMarker: true,
  audioEnabled: true,

  // overwrite with anything previously saved from local storage
  ...JSON.parse(localStorage.getItem('game-settings'))
});

// writes to local storage on update
settings.subscribe(value => {
  localStorage.setItem('game-settings', JSON.stringify(value))
});
