<script lang="ts">
  import { onDestroy } from "svelte";
  import Quiz from "./Quiz.svelte";
  import Input from "./Input.svelte";
  import { getQuiz } from "@/lib/quiz";
  import type { QuizItem } from "./lib/quiz";
  import SettingsModal from "./SettingsModal.svelte";
  import { settings } from "@/stores/settings";
  import type { GameSettings } from "./stores/settings";
  import Menu from "./Menu.svelte";
  import { resolvedTheme } from "@/stores/theme";
  import { isCorrectAnswer } from "@/lib/answer";
  import { playProgressSound, playErrorSound } from "@/lib/sound";
  import Theme from "./Theme.svelte";
  import Pickers from "./components/picker/Pickers.svelte";

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
      $settings.audioEnabled && playProgressSound(correctStreak);
      correctStreak += 1;
    } else {
      $settings.audioEnabled && playErrorSound();
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

  function startGame(opts: GameSettings) {
    quizItemIndex = 0;
    unquizzed = getQuiz(opts);
    quizzed = [];
    correctStreak = 0;
  }

  const unsubscribe = settings.subscribe(startGame);
  onDestroy(unsubscribe);
</script>

<style>
  @keyframes -global-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  main {
    --standard-transition: cubic-bezier(0.4, 0, 0.2, 1);
    --standard-border-radius: 10px;

    color: var(--text-color);
    background: var(--background-color);
    min-height: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    /*
      Primary font is M+ Type-2, followed by fallbacks
      https://stackoverflow.com/questions/14563064/japanese-standard-web-fonts/14573813#14573813
    */
    font-family: "M+ 2p", "MS PGothic", "ヒラギノ角ゴ Pro W3",
      "Hiragino Kaku Gothic Pro", Osaka, メイリオ, Meiryo, "ＭＳ Ｐゴシック",
      "MS PGothic", "ＭＳ ゴシック", "MS Gothic", "Noto Sans CJK JP",
      TakaoPGothic, sans-serif;
  }
</style>

<main id="type-kana" class={$resolvedTheme + '-theme'}>
  <Theme />
  <Pickers />
  <Quiz {unquizzed} {quizzed} {input} />
  <Input bind:input on:submit={handleSubmit} currentKana={unquizzed[0]?.kana} />
  <Menu on:menuEvent={handleMenuEvent} />
  <SettingsModal bind:this={settingsModal} />
</main>
