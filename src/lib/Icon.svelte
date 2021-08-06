<script lang="ts">
	export let size = "1em"
	export let width = size
	export let height = size
	export let color = "currentColor"
	export let viewBox = "0 0 24 24"
	export let path: string
	export let title = undefined
	export let ariaHidden = false
</script>

<svg
	class="svg-icon"
	{width}
	{height}
	role="img"
	{viewBox}
	aria-hidden={ariaHidden || title === undefined}
>
	{#if title}
		<title>{title}</title>
	{/if}
	<path d={path} fill={color} />
</svg>

<style>
	.svg-icon {
		position: relative;
		vertical-align: top;
	}
</style>
