import { writable } from "svelte/store";

export type KanaType = "hiragana" | "katakana" | "both";

export const kanaType = writable<KanaType>(
  localStorage.getItem("game-config-kana-type") as KanaType || "hiragana"
);

// writes to local storage on update
kanaType.subscribe(value => {
  localStorage.setItem("game-config-kana-type", value)
});
