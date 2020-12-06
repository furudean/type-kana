<script lang="ts">
  import { resolvedTheme } from "@/stores/theme";
  import { audioContext } from "@/lib/audio";
  import Theme from "./Theme.svelte";
  import Pickers from "./views/Pickers.svelte";
  import Quiz from "./views/Quiz.svelte";
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

<svelte:window
  on:mousedown|once={() => {
    // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    if (audioContext.state !== 'running') {
      audioContext.resume();
    }
  }} />

<main id="type-kana" class={$resolvedTheme + '-theme'}>
  <Theme /> 
  <Pickers />
  <Quiz/>
</main>
