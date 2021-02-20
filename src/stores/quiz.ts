import { shuffleArray } from "@/lib/random"
import type { Readable } from "svelte/store";
import { dictionary as dictionaryStore } from "./dictionary";
import { createPersistentStore } from "./persistent";

export interface QuizItem {
  kana: string;
  answer: string;
  incorrectTimes: number;
}

function createQuizItem(kana: string): QuizItem {
  return {
    kana,
    answer: null,
    incorrectTimes: 0,
  }
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
  useWebStorage(): void;
  insert(index: number, item: QuizItem): void;
  pop(props: Partial<QuizItem>): void;
  reset(): void;
}

export function createQuizStore(): QuizStore {
  let dictionary: string[] = [];
  const { subscribe, set, update, useWebStorage } = createPersistentStore(
    {
      key: "quiz-session",
      storage: sessionStorage,
    },
    createQuiz(dictionary),
  );

  const reset = () => { set(createQuiz(dictionary)); }

  dictionaryStore.subscribe(value => {
    dictionary = value;
    reset();
  });

  return {
    subscribe,
    useWebStorage,
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
    pop(props) {
      update(({ unquizzed, quizzed }) => ({
        // remove item from unquizzed
        unquizzed: unquizzed.slice(1),
        // add kana to quizzed array
        quizzed: [
          ...quizzed,
          {
            ...unquizzed[0],
            ...props,
          },
        ]
      })
      )
    },
    reset
  };
}

export const quiz = createQuizStore();
