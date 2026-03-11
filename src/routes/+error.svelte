<script lang="ts">
	import { page } from "$app/state"
	import { dev } from "$app/environment"
</script>

<svelte:head>
	<title>{page.error?.message || page.status} · Type Kana</title>
</svelte:head>

<h1>Error {page.status}</h1>

<p>{@html page.error?.message}</p>

{#if dev && (page.error as any)?.stack}
	<pre>{(page.error as any).stack}</pre>
{/if}

{#if page.status === 404}
	<a class="text-link" href="/">Go back home</a>
{/if}
