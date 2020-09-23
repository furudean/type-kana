<script lang="ts">
  import CogOutline from "@c-bandy/svelte-material-icons/dist/CogOutline.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function menuEvent(type: string) {
    dispatch("menuEvent", { type });
  }
</script>

<style>
  section {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    margin-top: 0.5em;
  }
  button {
    display: flex;
    color: #702632;
    background: none;
    margin: 0;
    border: 0;
    padding: 0.5em;
    cursor: pointer;
  }
</style>

<section>
  <button on:click={() => { menuEvent("menuToggle") }}>
    <CogOutline size="1.5em" />
  </button>
</section>
