<script lang="ts">
  import { onDestroy } from "svelte";
  import Quiz from "./Quiz.svelte";
  import Input from "./Input.svelte";
  import { getQuiz } from "./lib/quiz";
  import type { QuizItem } from "./lib/quiz";
  import Settings from "./Settings.svelte";
  import { settings } from "./lib/settings";
  import type { GameSettings } from "./lib/settings";
  import Menu from "./Menu.svelte";
  import { osTheme, resolvedTheme } from "./lib/theme";

  let unquizzed = [] as QuizItem[];
  let quizzed = [] as QuizItem[];
  let quizItemIndex = 0;
  let settingsComponent: Settings;

  function handleMenuEvent(event: CustomEvent) {
    if (event.detail.type === "openSettings") {
      settingsComponent.open();
    }
  }

  function handleSubmit(event: CustomEvent) {
    if (unquizzed.length === 0) {
      return;
    }

    // add kana to quizzed array
    quizzed = [
      ...quizzed,
      {
        ...unquizzed[0],
        answer: event.detail.text,
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
  main.light-theme,
  main {
    /* https://coolors.co/e0d1b8-52154e-00a6a6-080921-f76c5e */
    --standard-transition: cubic-bezier(0.4, 0, 0.2, 1);

    --background-color: hsl(38, 40%, 96%);

    --background-contrast: hsl(0, 0%, 100%);
    --background-contrast-light: hsl(0, 0%, 80%);

    --text-color: hsl(238, 61%, 8%);
    --text-color-light: hsl(0, 0%, 50%);
    --text-color-lighter: hsl(0, 0%, 80%);

    --accent-color: hsl(352, 47%, 25%);
    --highlight-color: hsl(5, 91%, 67%);
  }

  main.dark-theme {
    --standard-transition: cubic-bezier(0.4, 0, 0.2, 1);

    --background-color: rgb(36, 22, 37);

    --background-contrast: hsl(300, 24%, 17%);
    --background-contrast-light: hsl(300, 24%, 22%);

    --text-color: hsl(326 18% 75% / 1);
    --text-color-light: hsl(326 10% 46% / 1);
    --text-color-lighter: hsl(326 14% 23% / 1);

    --accent-color: hsl(304, 59%, 28%);
    --highlight-color: hsl(180, 100%, 33%);
  }

  main {
    padding: 1em;
    color: var(--text-color);
    background: var(--background-color);
    min-height: 100%;
    box-sizing: border-box;
    position: relative;
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

<main class={$resolvedTheme + '-theme'}>
  <p>{unquizzed.length} left</p>
  <Quiz {unquizzed} {quizzed} />
  <Input on:submitAnswer={handleSubmit} currentKana={unquizzed[0]?.kana} />
  <Menu on:menuEvent={handleMenuEvent} />
  <Settings bind:this={settingsComponent} />
</main>
