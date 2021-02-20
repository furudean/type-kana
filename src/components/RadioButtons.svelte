<script lang="ts">
  import type { Writable } from "svelte/store";
  import Radio from "./Radio.svelte";

  interface Option {
    label: string;
    value: string;
  }

  export let name: string;
  export let options: Option[];
  export let bind: Writable<any>;
</script>

{#each options as { label, value }}
  <div class="radio-group">
    <Radio
      id="{value}-radio-choice"
      {name}
      bind:group={$bind}
      {value}
    />
    <label for="{value}-radio-choice">{label}</label>
  </div>
{/each}

<style lang="scss">
  .radio-group {
    display: flex;
    align-items: center;
    
    &:not(:first-of-type) {
      margin-left: 2em;
    }
  }
  label {
    cursor: pointer;
    padding-left: 1em;
    user-select: none;
  }
</style>
