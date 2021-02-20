<script lang="ts">
  import Quiz from "./_Quiz.svelte";
  import Input from "./_Input.svelte";
  import Menu from "./_Menu.svelte";
  import SettingsModal from "./_SettingsModal.svelte";
  import { quiz } from "@/stores/quiz";
  import type { QuizItem } from "@/stores/quiz";
  import { isCorrectAnswer } from "@/lib/answer";
  import {
    loadProgressSound,
    playProgressSound,
    loadErrorSound,
    playErrorSound,
    loadMaximizeSound,
    loadMinimizeSound,
  } from "@/lib/sound";
  import { randomInt } from "@/lib/random";
  import { settings } from "@/stores/settings";
  import ProgressBar from "./_ProgressBar.svelte";
  import { onMount } from "svelte";

  let settingsModal: SettingsModal;
  let input: string;
  let streakLength = 0;

  let unquizzed: QuizItem[];
  let quizzed: QuizItem[];
  $: currentItem = unquizzed[0];

  // is there a better way to set up automatic subscriptions for a derived store
  // that returns a store?
  $quiz.subscribe((value) => {
    unquizzed = value.unquizzed;
    quizzed = value.quizzed;
  });

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
        const index = Math.min(randomInt(5, 12), unquizzed.length);

        const item: QuizItem = {
          ...currentItem,
          incorrectTimes: currentItem.incorrectTimes + 1,
        };

        $quiz.insert(index, item);
      }
    }

    $quiz.pop({ answer: event.detail.input });
  }

  onMount(() => {
    loadProgressSound();
    loadErrorSound();
    loadMaximizeSound();
    loadMinimizeSound();
  });
</script>

<svelte:head>
  <title>Session · Type Kana</title>
</svelte:head>

<ProgressBar {unquizzed} {quizzed} />
<Quiz {unquizzed} {quizzed} {input} />
<Input bind:input on:submit={handleSubmit} currentKana={currentItem?.kana} />
<Menu on:menuEvent={handleMenuEvent} />
<SettingsModal bind:this={settingsModal} />
