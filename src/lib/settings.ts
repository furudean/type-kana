import { writable } from 'svelte-persistent-store/dist/local'

export interface GameSettings {
  kanaType: 'hiragana' | 'katakana' | 'both',
}

export const settings = writable<GameSettings>('game-settings', {
  kanaType: 'hiragana',
});
