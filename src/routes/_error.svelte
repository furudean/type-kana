<script lang="ts">
  import Link from "../components/Link.svelte";

  export let status: number;
  export let error: Error;

  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>{error?.message || status} · Type Kana</title>
</svelte:head>

<h1>Error {status}</h1>

<p>{@html error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}

<Link href=".">Go back home</Link>
