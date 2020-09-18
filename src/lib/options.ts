import { writable, Writable } from 'svelte/store'

export interface Options {
  kanaType: 'hiragana' | 'katakana' | 'both'
}

export const options: Writable<Options> = writable({
  kanaType: 'hiragana',
});
