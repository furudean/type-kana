import { dictionary } from "@/stores/dictionary";
import { derived, writable } from "svelte/store";
import { shuffleArray } from "@/lib/random"

export interface QuizItem {
  kana: string;
  answer: string;
  incorrectTimes: number;
}

export function createQuizItem(kana: string): QuizItem {
  return {
    kana,
    answer: null,
    incorrectTimes: 0,
  }
}

export function createQuiz(dictionary: string[]) {
  const { subscribe, update } = writable({
    unquizzed: shuffleArray(dictionary).map(createQuizItem),
    quizzed: [] as QuizItem[]
  });

  return {
    subscribe,
    insert(index: number, item: QuizItem) {
      update(({ unquizzed, quizzed }) => {
        const before = unquizzed.slice(0, index);
        const after = unquizzed.slice(index);

        return {
          unquizzed: [...before, item, ...after],
          quizzed,
        }
      })
    },
    pop(props: Partial<QuizItem>) {
      update(({ unquizzed, quizzed }) => {
        return {
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
        }
      })
    },
  };
}

// this is funky!
export const quiz = derived(dictionary, ($dictionary) => createQuiz($dictionary));
