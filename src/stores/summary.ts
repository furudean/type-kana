import { derived } from "svelte/store";
import { quiz, QuizItem } from "./quiz";

function uniqBy<T>(array: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return array.filter(item => {
    let key = keyFn(item);
    return seen.has(key) ? false : seen.add(key);
  });
}

function uniqArray<T = boolean | number | string>(array: T[]): T[] {
  return [...array].sort()
    .filter((item, pos, ary) => !pos || item !== ary[pos - 1]);
}

interface SummaryKana {
  kana: string;
  answers: string[];
  incorrectTimes: number;
}

interface Summary {
  incorrect: SummaryKana[];
  correct: SummaryKana[];
  unquizzed: string[]
}

export const summary = derived(quiz, ($quiz): Summary => {
  const uniqQuizzed = uniqBy($quiz.quizzed, item => item.kana);

  function createSummaryKana({ kana, isCorrectAnswer }: QuizItem): SummaryKana {
    const dupes = $quiz.quizzed.filter(item => item.kana === kana);
    return {
      kana,
      answers: uniqArray(dupes.map(item => item.answered)),
      incorrectTimes: isCorrectAnswer ? 0 :
        dupes.filter(item => item.isCorrectAnswer === isCorrectAnswer).length,
    }
  }

  return {
    incorrect: uniqQuizzed
      .filter(item => !item.isCorrectAnswer)
      .map(createSummaryKana),
    correct: uniqQuizzed
      .filter(item => item.isCorrectAnswer)
      .map(createSummaryKana),
    unquizzed: $quiz.unquizzed.map((item) => item.kana)
  };
});
