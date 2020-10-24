import { writable } from 'svelte-persistent-store/dist/local'

export interface GameSettings {
  kanaType: 'hiragana' | 'katakana' | 'both',
  autoCommitEnabled: boolean,
  theme: 'light' | 'dark' | 'same-as-system',
}

export const settings = writable<GameSettings>('game-settings', {
  kanaType: 'hiragana',
  autoCommitEnabled: false,
  theme: 'same-as-system',
});
