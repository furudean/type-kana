<script lang="ts">
	interface Props {
		size?: string
		width?: string | number
		height?: string | number
		color?: string
		viewBox?: string
		path: string
		title?: string
		ariaHidden?: boolean
	}

	let {
		size = "1em",
		width = size,
		height = size,
		color = "currentColor",
		viewBox = "0 0 24 24",
		path,
		title = undefined,
		ariaHidden = false
	}: Props = $props()
</script>

<svg
	class="svg-icon"
	{width}
	{height}
	role="img"
	{viewBox}
	aria-label={title}
	aria-hidden={ariaHidden || title === undefined}
>
	<path d={path} fill={color} />
</svg>

<style>
	.svg-icon {
		position: relative;
		vertical-align: top;
	}
</style>
