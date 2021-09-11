<script lang="ts">
	import Logo from "$lib/Logo.svelte"
	import Button from "$lib/Button.svelte"
	import Icon from "@/lib/Icon.svelte"
	import { mdiArrowRight, mdiGithub } from "@mdi/js"
</script>

<svelte:head>
	<title>Type Kana</title>
</svelte:head>

<section class="header content-padding">
	<div class="content-width center">
		<h1><Logo size="2em" /> Type Kana</h1>
		<p>Proxy, warez. Anything's possible.</p>
		<ul>
			<li>
				<a
					class="menu-link"
					href="https://github.com/c-bandy/type-kana"
					target="_blank"
					rel="nofollow"
				>
					<Icon size="1.5em" path={mdiGithub} />
					<span>Source</span>
				</a>
			</li>
		</ul>
	</div>
</section>
<section class="content-padding">
	<div class="content-width center">
		<p>
			Type Kana is a quiz app to help you learn hiragana and katakana, the
			Japanese syllabaries.
		</p>
		<p>
			This was made by
			<a
				href="https://cass.moe"
				target="_blank"
				rel="nofollow"
				class="text-link">Cassidy Bandy</a
			>.
		</p>
		<Button href="/setup">
			Let's begin
			<Icon path={mdiArrowRight} size="1.5em" />
		</Button>
	</div>
</section>

<style lang="postcss">
	.header {
		background: var(--background-contrast);

		div > :last-child {
			margin-bottom: 0;
		}

		h1 {
			margin-bottom: calc(0.5 * var(--line-space));
			display: flex;
			align-items: center;
			gap: 0.5em;
		}

		ul {
			display: flex;
			padding: 0;
		}

		li {
			list-style: none;

			a {
				text-decoration: none;
				display: flex;
				gap: 0.5em;
				border-bottom: 1px solid transparent;

				&:hover {
					border-color: currentColor;
				}
			}
		}
	}

	.menu-link {
		color: var(--text-color);
	}

	* > :global(.button .svg-icon) {
		margin-right: -0.5em;
	}
</style>
