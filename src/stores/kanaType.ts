import { createPersistentStore } from "./persistent";

export type KanaType = "hiragana" | "katakana" | "both";

export const kanaType = createPersistentStore<KanaType>(
  "game-config-kana-type",
  "hiragana"
);
