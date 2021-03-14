import { shuffleArray } from "@/lib/random"
import type { Readable } from "svelte/store";
import { dictionary as dictionaryStore } from "./dictionary";
import { createPersistentStore } from "./persistent";

export interface QuizItem {
  kana: string;
  answered?: string;
  incorrectTimes?: number;
  isCorrectAnswer?: boolean;
}

function createQuizItem(kana: string): QuizItem {
  return { kana }
}

export interface Quiz {
  unquizzed: QuizItem[];
  quizzed: QuizItem[];
}

function createQuiz(dictionary: string[]): Quiz {
  return {
    unquizzed: shuffleArray(dictionary).map(createQuizItem),
    quizzed: []
  }
}

export interface QuizStore extends Readable<Quiz> {
  insert(index: number, item: QuizItem): void;
  pop(callback: (item: QuizItem) => QuizItem): void;
  reset(): void;
}

export function createQuizStore(): QuizStore {
  let dictionary: string[] = [];
  const { subscribe, set, update } = createPersistentStore(
    {
      key: "quiz-session",
      storageType: "sessionStorage",
    },
    createQuiz(dictionary),
  );

  // keep dictionary in sync
  dictionaryStore.subscribe(value => {
    dictionary = value;
  });

  return {
    subscribe,
    insert(index, item) {
      update(({ unquizzed, quizzed }) => {
        const before = unquizzed.slice(0, index);
        const after = unquizzed.slice(index);

        return {
          unquizzed: [...before, item, ...after],
          quizzed,
        }
      })
    },
    pop(callback) {
      update(({ unquizzed, quizzed }) => ({
        // remove item from unquizzed
        unquizzed: unquizzed.slice(1),
        // add kana to quizzed array
        quizzed: [
          ...quizzed,
          callback(unquizzed[0]),
        ]
      }
      ));
    },
    reset() {
      set(createQuiz(dictionary))
    }
  };
}

export const quiz = createQuizStore();
