import { writable } from 'svelte-persistent-store/dist/local'

export interface GameSettings {
  kanaType: 'hiragana' | 'katakana' | 'both',
  autoCommitEnabled: boolean,
}

export const settings = writable<GameSettings>('game-settings', {
  kanaType: 'hiragana',
  autoCommitEnabled: false,
});
