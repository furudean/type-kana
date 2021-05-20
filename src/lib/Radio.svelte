<script lang="ts">
	export let id: string = undefined
	export let name: string = undefined
	export let checked: boolean = undefined
	export let value: any
	export let disabled: boolean = undefined
	export let group: any = undefined

</script>

<div class="radio-button">
	<input type="radio" {id} {name} {value} bind:group {checked} {disabled} />
	{#if $$slots.default}
		<label for={id}>
			<slot />
		</label>
	{/if}
</div>

<style lang="postcss">
	.radio-button {
		display: flex;
		align-items: center;
	}

	input[type="radio"] {
		--checked-color: var(--form-element-primary-color);
		--checked-highlight-color: var(--form-element-primary-color-contrast);

		all: initial;
		display: inline-block;
		flex-shrink: 0;
		font-size: inherit;
		line-height: inherit;
		position: relative;
		width: 1em;
		height: 1em;
		background-color: white;
		border-radius: 50%;
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

	/* Regular state */
	input[type="radio"]:not(:disabled) {
		cursor: pointer;

		& + label {
			cursor: pointer;
		}
	}

	/* Checked state */

	input[type="radio"]:checked {
		background-color: var(--checked-color);
		box-shadow: inset 0 1px 3px var(--checked-highlight-color);
		border: 1px solid var(--checked-highlight-color);
	}

	input[type="radio"]:after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: white;
		border-radius: 50%;
		transform: scale(0);
		transition: 125ms var(--standard-curve) transform;
	}

	input[type="radio"]:checked:after {
		transform: scale(0.4);
	}

	/* Focus state */

	input[type="radio"]:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		box-shadow: 0 0 0 3px var(--focus-color);
		border-radius: 50%;
		opacity: 0;
		transition: 125ms var(--standard-curve) opacity;
	}

	input[type="radio"]:focus:before {
		opacity: 1;
	}

	/* Active state */

	input[type="radio"]:checked:active {
		background-color: var(--checked-highlight-color);
		transition: 60ms var(--standard-curve) transform;
	}

</style>
