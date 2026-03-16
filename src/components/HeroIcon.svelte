<script lang="ts">
	interface Props {
		src?: Record<string, string>[][]
		size?: string
		solid?: boolean
		ariaHidden?: boolean
		ariaLabel?: string
	}

	let {
		src = undefined,
		size = "1em",
		solid = false,
		ariaHidden = undefined,
		ariaLabel = undefined
	}: Props = $props()
</script>

{#if src}
	{#if solid}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			class="heroicon solid"
			aria-hidden={ariaHidden}
			aria-label={ariaLabel}
			width={size}
			height={size}
		>
			{#each src[0] ?? [] as att, i (i)}
				<path {...att} />
			{/each}
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="heroicon outline"
			aria-hidden={ariaHidden}
			aria-label={ariaLabel}
			width={size}
			height={size}
		>
			{#each src[1] ?? [] as att, i (i)}
				<path {...att} />
			{/each}
		</svg>
	{/if}
{/if}
