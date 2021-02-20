<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { resolvedTheme } from "@/stores/theme";
  import { audioContext } from "@/lib/audio";
  import Theme from "./Theme.svelte";
  import Global from "./Global.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import { configKana } from "@/stores/configKana";
  import { settings } from "@/stores/settings";
  import { kanaType } from "@/stores/kanaType";
  import { quiz } from "@/stores/quiz";

  onMount(() => {
    // Initialize web storage if we are running in browser
    kanaType.useWebStorageAPI();
    configKana.useWebStorageAPI();
    settings.useWebStorageAPI();

    // VERY funky, but it works!
    // this store returns a store on subscription
    quiz.subscribe((store) => {
      store.useWebStorageAPI();
    });
  });

  const unsubscribe = resolvedTheme.subscribe((theme) => {
    const root = document.querySelector(":root");

    root.classList.remove("light-theme", "dark-theme");
    root.classList.add(theme + "-theme");
  });
  onDestroy(unsubscribe);
</script>

<svelte:window
  on:mousedown|once={() => {
    // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    if (audioContext.state !== "running") {
      audioContext.resume();
    }
  }}
/>

<Global />
<Theme />
<main>
  <Router {routes} />
</main>

<style lang="scss">
  main {
    height: 100%;
    width: 100%;
  }
</style>
