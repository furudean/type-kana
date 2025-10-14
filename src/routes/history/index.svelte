<script lang="ts">
	import { history, difficultKanas } from "$/stores/history"
	import Button from "$/components/Button.svelte"
	import Icon from "$/components/MaterialIcon.svelte"
	import { mdiArrowLeft, mdiDelete } from "@mdi/js"
	import MenuBar from "$/components/MenuBar.svelte"
	import { prettyTime } from "$lib/util"

	function formatDate(timestamp: number): string {
		const date = new Date(timestamp)
		const now = new Date()
		const diffDays = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
		)

		if (diffDays === 0) {
			return `Today at ${date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})}`
		} else if (diffDays === 1) {
			return `Yesterday at ${date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})}`
		} else if (diffDays < 7) {
			return `${diffDays} days ago`
		} else {
			return date.toLocaleDateString([], {
				month: "short",
				day: "numeric",
				year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
			})
		}
	}

	function clearHistory() {
		if (
			confirm(
				"Are you sure you want to clear all history? This action cannot be undone."
			)
		) {
			history.clear()
		}
	}

	$: sessions = $history.sessions
	$: mostDifficult = $difficultKanas.slice(0, 20)
</script>

<svelte:head>
	<title>History · Type Kana</title>
</svelte:head>

<div class="main content-width content-padding center">
	<h1>Session History</h1>

	{#if mostDifficult.length > 0}
		<section class="difficult-kanas">
			<h2>Most Difficult Kanas</h2>
			<p class="subtitle">Accumulated errors across all sessions</p>
			<div class="kana-grid">
				{#each mostDifficult as { kana, errors }}
					<div class="kana-card">
						<span class="kana">{kana}</span>
						<span class="error-count">
							{errors} error{errors !== 1 ? "s" : ""}
						</span>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if sessions.length === 0}
		<section class="empty-state">
			<p>No sessions recorded yet. Complete a quiz to see your history here!</p>
		</section>
	{:else}
		<section class="sessions-list">
			<h2>Past Sessions ({sessions.length})</h2>
			<div class="sessions">
				{#each sessions as session}
					<div class="session-card">
						<div class="session-header">
							<span class="timestamp">{formatDate(session.timestamp)}</span>
							<span class="kana-type badge">{session.kanaType}</span>
						</div>
						<div class="session-stats">
							<div class="stat">
								<span class="stat-label">Accuracy</span>
								<span class="stat-value">
									{Math.round(session.accuracy * 100)}%
								</span>
							</div>
							<div class="stat">
								<span class="stat-label">Answered</span>
								<span class="stat-value">{session.totalAnswered}</span>
							</div>
							<div class="stat">
								<span class="stat-label">Duration</span>
								<span class="stat-value">{prettyTime(session.duration)}</span>
							</div>
						</div>
						{#if session.incorrect.length > 0}
							<div class="incorrect-kanas">
								<span class="label">Incorrect:</span>
								<div class="kanas">
									{#each session.incorrect as item}
										<span
											class="kana-item"
											title="{item.incorrectTimes} error(s)"
										>
											{item.kana}
											{#if item.incorrectTimes > 1}
												<sup class="error-badge">{item.incorrectTimes}</sup>
											{/if}
										</span>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>

<MenuBar class="glass-morphism">
	<div class="menu content-width content-padding center">
		<Button href="/setup" style="outline">
			<Icon path={mdiArrowLeft} size="1.25em" />
			Back
		</Button>
		{#if sessions.length > 0}
			<Button on:click={clearHistory} style="outline">
				<Icon path={mdiDelete} size="1.5em" />
				Clear history
			</Button>
		{/if}
	</div>
</MenuBar>

<style lang="postcss">
	.main {
		padding-bottom: 0;
		margin-bottom: var(--line-space);
	}

	section {
		margin-top: calc(2 * var(--line-space));
	}

	.subtitle {
		color: var(--text-secondary);
		margin-top: -0.5em;
		margin-bottom: 1.5em;
		font-size: 0.95em;
	}

	.difficult-kanas {
		background: var(--surface-2);
		padding: 2em;
		border-radius: 1em;
	}

	.kana-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 1em;
	}

	.kana-card {
		background: var(--surface-1);
		border: 2px solid var(--border);
		border-radius: 0.75em;
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;
		transition: 150ms var(--standard-curve);

		&:hover {
			transform: translateY(-2px);
			border-color: var(--primary);
		}
	}

	.kana-card .kana {
		font-size: 2.5em;
		font-weight: 700;
		line-height: 1;
	}

	.kana-card .error-count {
		font-size: 0.85em;
		color: var(--text-secondary);
	}

	.empty-state {
		text-align: center;
		padding: 3em 1em;
		color: var(--text-secondary);
	}

	.sessions-list h2 {
		margin-bottom: 1em;
	}

	.sessions {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.session-card {
		background: var(--surface-2);
		border: 2px solid var(--border);
		border-radius: 1em;
		padding: 1.5em;
		transition: 150ms var(--standard-curve);

		&:hover {
			border-color: var(--primary);
		}
	}

	.session-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1em;
	}

	.timestamp {
		font-weight: 600;
		font-size: 1.1em;
	}

	.badge {
		background: var(--primary);
		color: var(--surface-1);
		padding: 0.25em 0.75em;
		border-radius: 0.5em;
		font-size: 0.85em;
		font-weight: 600;
		text-transform: capitalize;
	}

	.session-stats {
		display: flex;
		gap: 2em;
		margin-bottom: 1em;
		flex-wrap: wrap;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.stat-label {
		font-size: 0.85em;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-size: 1.5em;
		font-weight: 700;
	}

	.incorrect-kanas {
		margin-top: 1em;
		padding-top: 1em;
		border-top: 1px solid var(--border);
	}

	.incorrect-kanas .label {
		font-size: 0.85em;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.5em;
		display: block;
	}

	.kanas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	.kana-item {
		position: relative;
		background: var(--surface-1);
		border: 2px solid var(--border);
		padding: 0.5em 0.75em;
		border-radius: 0.5em;
		font-size: 1.2em;
		font-weight: 600;
		display: inline-flex;
		align-items: center;
		gap: 0.25em;
	}

	.error-badge {
		background: var(--error);
		color: var(--surface-1);
		border-radius: 50%;
		font-size: 0.6em;
		min-width: 1.5em;
		height: 1.5em;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		margin-left: 0.25em;
	}

	.menu {
		display: flex;
		justify-content: center;
		gap: 1em;
	}

	.menu > :global(:nth-child(1) .svg-icon) {
		margin-left: -0.5em;
	}
</style>
