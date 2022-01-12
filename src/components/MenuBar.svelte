<script lang="ts">
	let classNames: string | undefined
	export { classNames as class }
</script>

<section class="menu-bar {classNames}">
	<slot />
</section>

<style lang="postcss">
	.menu-bar {
		flex-grow: 1;
		position: sticky;
		bottom: 0;
		isolation: isolate;
	}
</style>
