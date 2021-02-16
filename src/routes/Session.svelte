<script lang="ts">
  import { onDestroy } from "svelte";
  import Quiz from "../Quiz.svelte";
  import Input from "../Input.svelte";
  import Menu from "../Menu.svelte";
  import SettingsModal from "../SettingsModal.svelte";
  import { getQuiz } from "@/lib/quiz";
  import type { QuizItem } from "@/lib/quiz";
  import { isCorrectAnswer } from "@/lib/answer";
  import { playProgressSound, playErrorSound } from "@/lib/sound";
  import { dictionary } from "@/stores/dictionary";
  import { randomInt } from "@/lib/random";
  import { settings } from "@/stores/settings";
  import ProgressBar from "../ProgressBar.svelte";

  let unquizzed = [] as QuizItem[];
  let quizzed = [] as QuizItem[];
  let settingsModal: SettingsModal;
  let input: string;
  let streakLength = 0;

  $: currentItem = unquizzed[0];

  function handleMenuEvent(event: CustomEvent) {
    if (event.detail.type === "openSettings") {
      settingsModal.open();
    }
  }

  function handleSubmit(event: CustomEvent) {
    if (unquizzed.length === 0) {
      return;
    }

    if (isCorrectAnswer(event.detail.input, currentItem.kana)) {
      playProgressSound(streakLength);
      streakLength += 1;
    } else {
      playErrorSound();
      streakLength = 0;

      // Add item back at the end of queue at a random position;
      if ($settings.retryIncorrectAnswers) {
        const insertIndex = Math.min(randomInt(5, 12), unquizzed.length);
        const itemsBefore = unquizzed.slice(0, insertIndex);
        const itemsAfter = unquizzed.slice(insertIndex);

        const item: QuizItem = {
          ...currentItem,
          incorrectTimes: currentItem.incorrectTimes + 1,
        };

        unquizzed = [...itemsBefore, item, ...itemsAfter];
      }
    }

    // add kana to quizzed array
    quizzed = [
      ...quizzed,
      {
        ...currentItem,
        answer: event.detail.input,
      },
    ];

    // remove item from unquizzed
    unquizzed = unquizzed.slice(1);
  }

  function startGame(dictionary: string[]) {
    unquizzed = getQuiz(dictionary);
    quizzed = [];
    streakLength = 0;
  }

  const unsubscribe = dictionary.subscribe(startGame);
  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>Session · Type Kana</title>
</svelte:head>

<section>
  <ProgressBar {unquizzed} {quizzed} />
  <Quiz {unquizzed} {quizzed} {input} />
  <Input bind:input on:submit={handleSubmit} currentKana={currentItem?.kana} />
  <Menu on:menuEvent={handleMenuEvent} />
  <SettingsModal bind:this={settingsModal} />
</section>
