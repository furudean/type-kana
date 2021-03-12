import { createPersistentStore } from "./persistent";

export type KanaType = "hiragana" | "katakana" | "both";

export const kanaType = createPersistentStore<KanaType>(
  { key: "game-config-kana-type" },
  "hiragana"
);
