<script lang="ts">
	import Logo from "$lib/Logo.svelte"
	import MaterialIcon from "$/lib/MaterialIcon.svelte"
	import { mdiGithub } from "@mdi/js"
	import { Star } from "svelte-hero-icons"
	import HeroIcon from "$/lib/HeroIcon.svelte"

	export let stargazers: number
</script>

<section class="header content-padding">
	<div class="content-width center">
		<h1><Logo size="2em" />Type Kana</h1>
		<ul>
			<li>
				<a
					href="https://cass.moe"
					target="_blank"
					rel="nofollow"
					class="menu-link"
					aria-label="Author"
				>
					by c-bandy
				</a>
			</li>
			<li>
				<a
					href="https://github.com/c-bandy/type-kana"
					target="_blank"
					rel="nofollow"
					class="menu-link"
					title="Source code"
					aria-label="Source code"
				>
					<MaterialIcon title="GitHub logo" size="1.25em" path={mdiGithub} />
					<span aria-label="{stargazers} stargazers on GitHub" class="stars">
						{stargazers.toLocaleString("en")}
						<HeroIcon size="1em" src={Star} solid={true} ariaLabel="stars" />
					</span>
				</a>
			</li>
		</ul>
	</div>
</section>

<style lang="postcss">
	.header {
		background: var(--background-contrast);
	}

	.stars {
		display: flex;
		align-items: center;
	}

	h1 {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	ul {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		gap: var(--line-space);
	}

	li {
		list-style: none;

		a {
			display: flex;
			align-items: center;
			gap: 0.3em;
			text-decoration: none;
			border-bottom: 1px solid transparent;
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
