<script lang="ts">
	import { mdiCheckBold, mdiMinusThick } from "@mdi/js"
	import { svgToDataUrl } from "@/lib/util"

	export let title: string = undefined
	export let id: string = undefined
	export let checked: boolean
	export let indeterminate: boolean = undefined
	export let disabled: boolean = undefined
	export let ariaLabel: string = undefined

	const checkedIcon = svgToDataUrl(mdiCheckBold)
	const indeterminateIcon = svgToDataUrl(mdiMinusThick)
	const style =
		`--checked-icon-url: url("${checkedIcon}");` +
		`--indeterminate-icon-url: url("${indeterminateIcon}");`
</script>

<div class="checkbox">
	<input
		type="checkbox"
		{title}
		{id}
		bind:checked
		{disabled}
		{indeterminate}
		aria-label={ariaLabel}
		{style}
		on:click
	/>
	{#if $$slots.default}
		<label for={id}>
			<slot />
		</label>
	{/if}
</div>

<style lang="postcss">
	.checkbox {
		display: flex;
		align-items: center;
	}

	input[type="checkbox"] {
		--checked-color: var(--form-element-primary-color);
		--checked-highlight-color: var(--form-element-primary-color-contrast);

		all: initial;
		display: inline-block;
		flex-shrink: 0;
		position: relative;
		font-size: inherit;
		line-height: inherit;
		width: 1em;
		height: 1em;
		background: white;
		border-radius: 25%;
		margin: 0;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.15);
		transition: 125ms var(--standard-curve) background-color;
	}

	label {
		display: block;
		padding-left: 1em;
		user-select: none;
		white-space: pre-line;
		overflow-wrap: break-word;
	}

	/* Checked + indeterminate states */

	input[type="checkbox"]::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		mask-position: center;
		mask-repeat: no-repeat;
	}

	input[type="checkbox"]:checked {
		background: var(--checked-color);
		box-shadow: inset 0 1px 3px var(--checked-highlight-color);
		border: 1px solid var(--checked-highlight-color);

		&:after {
			mask-image: var(--checked-icon-url);
			mask-size: 90%;
			background-color: white;
		}
	}

	input[type="checkbox"]:indeterminate:after {
		mask-image: var(--indeterminate-icon-url);
		mask-size: 78%;
		background-color: hsl(0, 0%, 60%);
	}

	/* Disabled state */

	input[type="checkbox"]:disabled {
		background-color: hsl(0, 0%, 50%);
		box-shadow: inset 0 1px 3px hsl(0, 0%, 55%);
		cursor: auto;
	}

	/* Focus state */

	input[type="checkbox"]:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		box-shadow: 0 0 0 3px var(--focus-color);
		border-radius: 25%;
		opacity: 0;
		transition: 125ms var(--standard-curve) opacity;
	}

	input[type="checkbox"]:focus:before {
		opacity: 1;
	}

	/* Active state */

	input[type="checkbox"]:checked:active:not(:disabled) {
		background-color: var(--checked-highlight-color);
		transition: 60ms var(--standard-curve) transform;
	}
</style>
