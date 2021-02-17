<style global>
  :root {
    --standard-transition: cubic-bezier(0.4, 0, 0.2, 1);
    --standard-border-radius: 10px;

    height: 100%;
  }

  body {
    margin: 0;
    min-height: 100%;
    color: var(--text-color);
    background: var(--background-color);
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

  .sr-only {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
</style>
