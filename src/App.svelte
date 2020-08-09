<script lang="ts">
  import { hiragana, isSameKana } from "./lib/db";
  import Kana from "./Kana.svelte";
  import Quiz from "./Quiz.svelte";
  import Input from "./Input.svelte";
  import { quizItem } from "./lib/quiz-item";
  import type { QuizItem } from "./lib/quiz-item";

  const dictionary = [
    ...hiragana.monographs,
    ...hiragana.monographDiacritics,
    ...hiragana.digraphs,
    ...hiragana.digraphsDiacritics,
  ];

  let queue = Array(50)
    .fill(null)
    .map((_, i) => quizItem(dictionary, i));
  let quizzed = [] as QuizItem[];
  let quizItemIndex = 0;

  function handleSubmit(event: CustomEvent) {
    // add kana to quizzed array
    quizzed = [
      ...quizzed,
      {
        ...queue[0],
        answer: isSameKana(event.detail.text, queue[0].kana)
          ? "correct"
          : "incorrect",
      },
    ];

    // remove item from queue
    queue = queue.filter((item) => item.index !== quizItemIndex);

    quizItemIndex += 1;
  }
</script>

<style>
  main {
    padding: 1em;
  }
</style>

<main>
  <p>{queue.length} left</p>
  <Quiz {queue} {quizzed} />
  <Input on:submitKana={handleSubmit} />
</main>
