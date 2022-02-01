<script lang="ts">
	import Logo from "$/components/Logo.svelte"
	import MaterialIcon from "$/components/MaterialIcon.svelte"
	import { mdiGithub } from "@mdi/js"
	import { Star } from "svelte-hero-icons"
	import HeroIcon from "$/components/HeroIcon.svelte"
	import { commitHashLong, commitHashShort } from "$/lib/version"

	export let stargazers: number
</script>

<section class="header content-padding">
	<div class="content-width center">
		<h1><Logo size="2em" />Type Kana</h1>
		<ul>
			<li>
				<a
					href="https://furudean.com"
					target="_blank"
					rel="nofollow"
					class="menu-link"
					aria-label="Author"
				>
					by Merilynn
				</a>
			</li>
			<li>
				<a
					href="https://github.com/furudean/type-kana"
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
			<li>
				<a
					href="https://github.com/furudean/type-kana/commit/{commitHashLong}"
					target="_blank"
					rel="noopener"
					title="Current build commit (GitHub)"
					class="menu-link"
				>
					commit #{commitHashShort}
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
		white-space: nowrap;

		a {
			display: flex;
			align-items: center;
			gap: 0.3em;
			text-decoration: none;
			border-bottom: 1px solid transparent;

			&:hover {
				border-color: currentColor;
			}
		}
	}

	.menu-link {
		color: var(--text-color);

		&:active,
		&:focus-visible {
			outline: none;
			color: var(--text-color-on-focus-color);
			background: var(--focus-color);
			border-color: var(--focus-color);
		}
	}

	.text-link:before {
		background-color: currentColor !important;
	}
</style>
