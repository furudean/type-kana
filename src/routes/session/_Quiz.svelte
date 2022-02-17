<script lang="ts">
	import QuizItemComponent from "./_QuizItem.svelte"
	import type { QuizItem } from "$/stores/quiz"
	import { getAnswers } from "$/lib/answer"
	import { settings } from "$/stores/settings"
	import Icon from "$/components/MaterialIcon.svelte"
	import { mdiClose as errorMarkerIcon } from "@mdi/js"

	export let unquizzed: QuizItem[]
	export let quizzed: QuizItem[]
	export let input = ""
	export let currentKanaElement: HTMLDivElement

	$: queue = unquizzed.slice(1)
	$: currentItem = unquizzed[0]
	$: errorMarkerVisible = showErrorMarker(currentItem?.kana, input)

	function showErrorMarker(kana?: string, input?: string): boolean {
		if (
			$settings.showErrorMarker &&
			kana &&
			input?.length > 0 &&
			$settings.autoCommit !== "strict"
		) {
			return !getAnswers(kana).some((answer) => answer.startsWith(input))
		} else {
			return false
		}
	}
</script>

<section class="quiz">
	<div class="kana-queue">
		{#each [...queue].slice(0, 15) as { kana }}
			<QuizItemComponent {kana} />
		{/each}
	</div>
	<div class="current-kana">
		{#if currentItem}
			<QuizItemComponent
				kana={currentItem.kana}
				isCurrent={true}
				bind:element={currentKanaElement}
			/>
		{/if}
	</div>
	<div class="kana-quizzed">
		{#each [...quizzed]
			.reverse()
			.slice(0, 15) as { kana, answered, isCorrectAnswer }}
			<QuizItemComponent {kana} {answered} {isCorrectAnswer} />
		{/each}
	</div>
	<div
		class="error-marker"
		class:visible={errorMarkerVisible}
		aria-hidden={!errorMarkerVisible}
	>
		<Icon path={errorMarkerIcon} />
	</div>
</section>

<style lang="postcss">
	.quiz {
		display: flex;
		overflow-x: hidden;
		flex-direction: row-reverse;
		padding: 2em 0 3em;
		position: relative;
	}
	.kana-quizzed,
	.kana-queue {
		display: flex;
		flex-wrap: nowrap;
		flex: 1 1 0;
		min-width: 0;
	}
	.current-kana {
		position: relative;
	}
	.kana-quizzed {
		flex-direction: row-reverse;
	}

	.error-marker {
		display: flex;
		position: absolute;
		left: 50%;
		bottom: 0.5em;
		transform: translate(-50%, 0);
		color: var(--highlight-color);
		font-size: 1.75em;
		opacity: 0;
		transition: 150ms var(--standard-curve) opacity;

		&.visible {
			opacity: 1;
		}
	}

	.quiz,
	.kana-queue,
	.kana-quizzed {
		gap: 1em;
	}
</style>
