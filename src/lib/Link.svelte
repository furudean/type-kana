<script lang="ts">
	import { mdiOpenInNew } from "@mdi/js"
	import { svgToDataUrl } from "@/lib/util"

	export let href: string
	export let target: string = undefined
	export let rel: string = undefined

	const iconDataUrl = svgToDataUrl(mdiOpenInNew)
	const style = `--icon-url: url("${iconDataUrl}")`
</script>

<a {href} {target} {rel} {...$$restProps} {style}>
	<slot />
</a>

<style lang="scss">
	a,
	a:visited {
		color: var(--accent-color);
		text-decoration: none;
		transition: transform 50ms var(--standard-curve);

		&:hover {
			text-decoration: underline dotted var(--accent-color);
		}
		&:focus {
			outline: none;
			color: var(--background-color);
			background-color: var(--accent-color);
			text-decoration: underline dotted var(--background-color);
		}
		&:active {
			transform: translateY(10%);
		}
	}

	a[target="_blank"] {
		&:after {
			content: "";
			display: inline-block;
			vertical-align: baseline;
			position: relative;
			top: 2px; // visual balance
			width: 1em;
			height: 1em;
			background-color: var(--accent-color);
			mask-image: var(--icon-url);
			mask-repeat: no-repeat;
			mask-position: 50% 50%;
		}
		&:focus:after {
			background-color: var(--background-color);
		}
	}
</style>
