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

  $: unquizzed = $quiz.unquizzed;
  $: quizzed = $quiz.quizzed;
  $: currentItem = unquizzed[0];

  function handleMenuEvent(event: CustomEvent) {
    switch (event.detail.type) {
      case "openSettings":
        settingsModal.open();
        break;

      case "restart":
        quiz.reset();
        break;

      default:
        break;
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

        quiz.insert(index, item);
      }
    }

    quiz.pop({ answer: event.detail.input });
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
