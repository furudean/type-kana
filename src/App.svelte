<script lang="ts">
  import { onDestroy } from 'svelte';
  import Quiz from "./Quiz.svelte";
  import Input from "./Input.svelte";
  import { getQuiz } from "./lib/quiz";
  import type { QuizItem } from "./lib/quiz-item";
  import Options from "./Options.svelte";
  import { settings } from "./lib/settings";
  import type { GameSettings } from "./lib/settings";

  let unquizzed = [] as QuizItem[];
  let quizzed = [] as QuizItem[];
  let quizItemIndex = 0;

  function handleSubmit(event: CustomEvent) {
    if (unquizzed.length === 0) {
      return;
    }

    // add kana to quizzed array
    quizzed = [
      ...quizzed,
      {
        ...unquizzed[0],
        answer: event.detail.text
      },
    ].sort((a, b) => {
      // for some inexplicable reason, svelte likes to "optimize" this array
      // by putting it in a completely random order.
      // this works, but probably not very performant to do on every submit.
      return a.index - b.index;
    });

    // remove item from unquizzed
    unquizzed = unquizzed.filter((item) => item.index !== quizItemIndex);

    quizItemIndex += 1;
  }

  function startGame(opts: GameSettings) {
    quizItemIndex = 0;
    unquizzed = getQuiz(opts);
    quizzed = [];
  }

  const unsubscribe = settings.subscribe(startGame);
  onDestroy(unsubscribe);
</script>

<style>
  :global(:root) {
    /* https://coolors.co/e0d1b8-52154e-00a6a6-080921-f76c5e */
    --standard-transition: cubic-bezier(0.4, 0.0, 0.2, 1);
  }

  main {
    padding: 1em;
    color: #080921;
    background: #f9f6f1;
    min-height: 100%;
    box-sizing: border-box;
  }
</style>

<main>
  <p>{unquizzed.length} left</p>
  <Quiz {unquizzed} {quizzed} />
  <Input on:submitAnswer={handleSubmit} />
  <Options/>
</main>
