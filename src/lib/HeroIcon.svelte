<script lang="ts">
	export let src: Record<string, unknown>[][] = []
	export let size = "1em"
	export let solid = false
	export let ariaHidden = false
	export let ariaLabel: string = undefined
</script>

{#if src && src != []}
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
			{#each src[0] ?? [] as att}
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
			{#each src[1] ?? [] as att}
				<path {...att} />
			{/each}
		</svg>
	{/if}
{/if}
