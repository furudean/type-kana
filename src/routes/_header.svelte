<script lang="ts">
	import Logo from "$lib/Logo.svelte"
	import Icon from "@/lib/Icon.svelte"
	import { mdiGithub, mdiOpenInNew } from "@mdi/js"
</script>

<section class="header content-padding">
	<div class="content-width center">
		<h1><Logo size="2em" /> Type Kana</h1>
		<ul>
			<li>
				<a
					href="https://github.com/c-bandy/type-kana"
					target="_blank"
					rel="nofollow"
					class="menu-link"
				>
					<Icon size="1.25em" path={mdiGithub} />
					source
					<Icon size="1em" path={mdiOpenInNew} />
				</a>
			</li>
			<li>
				<a
					href="https://cass.moe"
					target="_blank"
					rel="nofollow"
					class="menu-link"
				>
					about
					<Icon size="1em" path={mdiOpenInNew} />
				</a>
			</li>
		</ul>
	</div>
</section>

<style lang="postcss">
	.header {
		background: var(--background-contrast);

		> div {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		> div > :last-child {
			margin-bottom: 0;
		}
	}

	h1 {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		padding: 0;
		margin-top: 0;
		gap: calc(0.5 * var(--line-space));
	}

	li {
		list-style: none;

		a {
			text-decoration: none;
			display: flex;
			gap: 0.5em;
			border-bottom: 1px solid transparent;
			align-items: center;
			line-height: 1;

			&:hover {
				border-color: currentColor;
			}
		}
	}

	.menu-link {
		color: var(--text-color);
	}

	.text-link:before {
		background-color: currentColor !important;
	}
</style>
