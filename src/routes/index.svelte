<script lang="ts" context="module">
  import type { Preload } from "@sapper/common";

  export const preload: Preload = async function (this, page, session) {
    this.redirect(301, "setup");
  };
</script>
