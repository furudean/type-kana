<script lang="ts">
  import { onDestroy } from "svelte";
  import Quiz from "../Quiz.svelte";
  import Input from "../Input.svelte";
  import Menu from "../Menu.svelte";
  import SettingsModal from "../SettingsModal.svelte";
  import { getQuiz } from "@/lib/quiz";
  import type { QuizItem } from "@/lib/quiz";
  import { settings } from "@/stores/settings";
  import { isCorrectAnswer } from "@/lib/answer";
  import { playProgressSound, playErrorSound } from "@/lib/sound";
  import { dictionary } from "@/stores/dictionary";

  let unquizzed = [] as QuizItem[];
  let quizzed = [] as QuizItem[];
  let quizItemIndex = 0;
  let settingsModal: SettingsModal;
  let input: string;
  let correctStreak = 0;

  function handleMenuEvent(event: CustomEvent) {
    if (event.detail.type === "openSettings") {
      settingsModal.open();
    }
  }

  function handleSubmit(event: CustomEvent) {
    if (unquizzed.length === 0) {
      return;
    }

    if (isCorrectAnswer(event.detail.input, unquizzed[0].kana)) {
      playProgressSound(correctStreak);
      correctStreak += 1;
    } else {
      playErrorSound();
      correctStreak = 0;
    }

    // add kana to quizzed array
    quizzed = [
      ...quizzed,
      {
        ...unquizzed[0],
        answer: event.detail.input,
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

  function startGame(dictionary: string[]) {
    unquizzed = getQuiz(dictionary);
    quizzed = [];
    quizItemIndex = 0;
    correctStreak = 0;
  }

  const unsubscribe = dictionary.subscribe(startGame);
  onDestroy(unsubscribe);
</script>

<section>
  <Quiz {unquizzed} {quizzed} {input} />
  <Input bind:input on:submit={handleSubmit} currentKana={unquizzed[0]?.kana} />
  <Menu on:menuEvent={handleMenuEvent} />
  <SettingsModal bind:this={settingsModal} />
</section>
