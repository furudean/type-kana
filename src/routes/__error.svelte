<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		}
	}
</script>

<script lang="ts">
	import { dev } from "$app/env"

	export let status: number
	export let error: Error
</script>

<svelte:head>
	<title>{error?.message || status} · Type Kana</title>
</svelte:head>

<h1>Error {status}</h1>

<p>{@html error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

{#if status === 404}
	<a class="text-link" href="/">Go back home</a>
{/if}
