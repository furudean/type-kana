<script lang="ts">
	import Logo from "$lib/Logo.svelte"
</script>

<svelte:head>
	<title>Type Kana</title>
</svelte:head>

<div class="content-padding">
	<div class="logos">
		<img src="/icon.png" alt="Type Kana logo" />
		<Logo size="16em" />
		<Logo size="8em" />
		<Logo size="4em" />
		<Logo size="2em" />
		<Logo size="1em" />
	</div>
</div>

<style>
	.logos {
		background: var(--background-contrast);
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 2em;
		padding: 3em;
		position: relative;
		height: 30em;
	}
</style>
