<script lang="ts">
	export let title: string = undefined
	export let disabled = false

	// link props
	export let href: string = undefined
	export let target: string = undefined
	export let rel: string = undefined
</script>

{#if !href}
	<button type="button" class="button" class:disabled {title} {disabled} on:click>
		<slot />
	</button>
{:else}
	<a {href} class="button" class:disabled aria-disabled={disabled} {target} {rel} {title} on:click sapper:prefetch>
		<slot />
	</a>
{/if}

<style lang="scss">
	.button {
		--border-size: 3px;
		--padding-vertical: 0.75em;
		--padding-horizontal: 1.5em;

		all: initial;
		display: block;
		user-select: none;
		cursor: pointer;
		font-family: "M+ 2c";
		font-weight: 500;
		letter-spacing: 1px;
		color: var(--text-color-on-accent-color);
		background: var(--accent-color);
		border: var(--border-size) solid transparent;
		border-radius: var(--standard-border-radius);
		padding: calc(var(--padding-vertical) - var(--border-size)) calc(var(--padding-horizontal) - var(--border-size));
		transition: transform 50ms var(--standard-transition), color 125ms var(--standard-transition),
			background-color 125ms var(--standard-transition), border-color 125ms var(--standard-transition);
	}

	.button:not(.disabled) {
		&:focus,
		&:hover {
			border-color: var(--focus-color);
		}
		&:active {
			transform: translateY(10%);
		}
	}

	.button.disabled {
		background: var(--text-color-light);
		color: var(--text-color-lighter);
		cursor: default;
		pointer-events: none;
	}
</style>
