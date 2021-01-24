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

  let unquizzed = [] as QuizItem[];
  let quizzed = [] as QuizItem[];
  let settingsModal: SettingsModal;
  let input: string;
  let streakLength = 0;

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
      playProgressSound(streakLength);
      streakLength += 1;
    } else {
      playErrorSound();
      streakLength = 0;
    }

    // add kana to quizzed array
    quizzed = [
      ...quizzed,
      {
        ...unquizzed[0],
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

<section>
  <Quiz {unquizzed} {quizzed} {input} />
  <Input bind:input on:submit={handleSubmit} currentKana={unquizzed[0]?.kana} />
  <Menu on:menuEvent={handleMenuEvent} />
  <SettingsModal bind:this={settingsModal} />
</section>
