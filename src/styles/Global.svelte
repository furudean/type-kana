<style global>
  :root,
  body {
    height: 100%;
    width: 100%;
  }

  :root {
    --standard-transition: cubic-bezier(0.4, 0, 0.2, 1);
    --standard-border-radius: 0.75rem;
  }

  body {
    margin: 0;
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
    font-size: 16px;
  }

  * {
    touch-action: pan-y; /* Prevent zooming in mobile Safari. */
  }

  h1 {
    margin: 1em 0;
    font-size: 1.8em;
    font-weight: 700;
    line-height: 1;
  }

  h2 {
    margin: 1em 0;
    font-size: 1.4em;
    font-weight: 500;
    line-height: 1;
  }

  hr {
    border: none;
    background: var(--text-color-lighter);
    height: 1px;
    margin: 2em 0;
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
