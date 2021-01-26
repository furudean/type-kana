<style lang="scss">
  :global(#type-kana.light-theme, #type-kana) {
    --background-color: hsl(40, 100%, 95%);
    --background-color-inverse: hsl(296, 25%, 12%);
    --text-color-inverse: white;

    --background-contrast: hsl(0, 0%, 100%);
    --background-contrast-light: hsl(0, 0%, 80%);

    --text-color: hsl(238, 61%, 8%);
    --text-color-light: hsl(0, 0%, 50%);
    --text-color-lighter: hsl(0, 0%, 80%);

    --accent-color: hsl(358, 45%, 37%);
    --text-color-on-accent-color: white;
    --border-color-on-accent-color: hsl(238, 61%, 8%);

    --secondary-accent-color: hsl(22, 62%, 42%);

    --focus-color: hsl(205, 100%, 51%);

    --highlight-color: hsl(5, 91%, 67%);

    --overlay-background-color: rgba(0, 0, 0, 0.4);

    --ui-element-primary-color: hsl(205, 100%, 51%);
    --ui-element-secondary-color: hsl(205, 100%, 87%)
  }

  :global(#type-kana.dark-theme) {
    --background-color: hsl(296, 25%, 12%);
    --background-color-inverse: hsl(38, 70%, 96%);
    --text-color-inverse: hsl(238, 61%, 8%);
    
    --background-contrast: hsl(300, 24%, 17%);
    --background-contrast-light: hsl(300, 24%, 22%);

    --text-color: hsl(326, 18%, 75%);
    --text-color-light: hsl(326, 10%, 46%);
    --text-color-lighter: hsl(326, 14%, 23%);

    --accent-color: hsl(304, 75%, 40%);
    --text-color-on-accent-color: white;
    --border-color-on-accent-color: white;

    --secondary-accent-color: hsl(202, 87%, 40%);

    --focus-color: white;

    --highlight-color: hsl(27, 100%, 43%);

    --overlay-background-color: rgba(255, 255, 255, 0.3);

    --ui-element-primary-color: white;
    --ui-element-secondary-color: hsl(326, 10%, 46%);
  }
</style>
