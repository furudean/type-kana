<script lang="ts">
  import type { Writable } from "svelte/store";

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
    <input
      type="radio"
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

    &:not(:first-of-type) {
      margin-left: 1em;
    }
  }
  input[type="radio"] {
    margin: 0 1em;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
  }
  label {
    line-height: 1;
    cursor: pointer;
  }
</style>
