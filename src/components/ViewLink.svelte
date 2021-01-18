<script lang="ts">
  import { view } from "@/stores/state";

  export let viewName: string;
</script>

<button
  type="button"
  on:click={() => {
    view.set(viewName);
  }}
  {...$$restProps}>
  <slot />
</button>
