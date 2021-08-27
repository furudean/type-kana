<script lang="ts">
	export let title: string = undefined
	export let disabled = false

	// link props
	export let href: string = undefined
	export let target: string = undefined
	export let rel: string = undefined
</script>

{#if !href}
	<button type="button" class="button" {title} {disabled} on:click>
		<div class="effect">
			<slot />
		</div>
	</button>
{:else}
	<a
		{href}
		class="button"
		class:disabled
		aria-disabled={disabled ? true : undefined}
		tabindex={disabled ? -1 : undefined}
		{target}
		{rel}
		{title}
		on:click
		sveltekit:prefetch
	>
		<div class="effect">
			<slot />
		</div>
	</a>
{/if}

<style lang="postcss">
	.button {
		--border-size: 3px;
		--padding-vertical: 0.6em;
		--padding-horizontal: 1.5em;

		all: initial;
		display: inline-block;
		user-select: none;
		color: var(--text-color-on-accent-color);
		font-family: "M+ 2c";
		font-weight: 500;
		letter-spacing: 1px;
	}

	a.button:hover,
	a.button:focus {
		text-decoration: underline;
	}

	/* Wrap the <button> content in a containing <div> to that the :active 
		transition doesn't stop any button clicks */
	.effect {
		background: var(--accent-color);
		border: var(--border-size) solid transparent;
		border-radius: var(--standard-border-radius);
		padding: calc(var(--padding-vertical) - var(--border-size))
			calc(var(--padding-horizontal) - var(--border-size));
		transition: transform 50ms var(--standard-curve),
			color 125ms var(--standard-curve),
			background-color 125ms var(--standard-curve),
			border-color 125ms var(--standard-curve);
	}

	.button:not(.disabled) {
		&:focus-visible > .effect {
			border-color: var(--focus-color);
		}
		&:active > .effect {
			transform: translateY(8%) scale(105%, 90%);
		}
	}

	.button.disabled {
		cursor: default;
		pointer-events: none;
		> .effect {
			color: var(--text-color-lighter);
			background: var(--text-color-light);
		}
	}

	.button[href] {
		cursor: pointer;
	}
</style>
