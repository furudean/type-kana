<script lang="ts">
  import { onDestroy } from "svelte";
  import { resolvedTheme } from "@/stores/theme";
  import { audioContext } from "@/lib/audio";
  import Theme from "./Theme.svelte";
  import Global from "./Global.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "./routes";

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

<main>
  <Global />
  <Theme />
  <Router {routes} />
</main>
