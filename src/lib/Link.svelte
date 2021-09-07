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

<style lang="postcss">
	:any-link {
		color: var(--secondary-accent-color);
		text-decoration: none;
		border-bottom: 1px solid var(--secondary-accent-color);

		&:focus-visible {
			outline: none;
			color: var(--text-color-on-focus-color);
			background: var(--focus-color);
			border-bottom: none;
		}
		&:active {
			transform: translateY(10%);
		}
	}

	:any-link[target="_blank"] {
		&:before {
			content: "";
			display: inline-block;
			vertical-align: top;
			position: relative;
			top: 4px; /* visual balance */
			width: 1em;
			height: 1em;
			background-color: var(--secondary-accent-color);
			mask-image: var(--icon-url);
			mask-repeat: no-repeat;
			mask-position: 50% 50%;
			margin-right: 0.1em;
		}
		&:focus-visible:before {
			background-color: var(--text-color-on-focus-color);
		}
	}
</style>
