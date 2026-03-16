<script lang="ts">
	interface Props {
		class: string | undefined
		children?: import("svelte").Snippet
	}

	let { class: classNames, children }: Props = $props()
</script>

<section class="menu-bar {classNames}">
	{@render children?.()}
</section>

<style lang="postcss">
	.menu-bar {
		flex-grow: 1;
		position: sticky;
		bottom: 0;
		isolation: isolate;
		z-index: 1;
	}
</style>
