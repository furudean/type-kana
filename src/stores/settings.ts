import { writable } from 'svelte-persistent-store/dist/local'

export interface GameSettings {
  kanaType: 'hiragana' | 'katakana' | 'both';
  autoCommit: 'lazy' | 'strict' | 'disabled';
  theme: 'light' | 'dark' | 'same-as-system';
  showErrorMarker: boolean;
  audioEnabled: boolean;
}

export const settings = writable<GameSettings>('game-settings', {
  kanaType: 'hiragana',
  autoCommit: 'disabled',
  theme: 'same-as-system',
  showErrorMarker: true,
  audioEnabled: true,
});
