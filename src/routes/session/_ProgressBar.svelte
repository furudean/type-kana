<script lang="ts">
	import type { QuizItem } from "@/stores/quiz"
	import { roundN } from "@/lib/util"
	import { settings } from "@/stores/settings"

	export let unquizzed: QuizItem[]
	export let quizzed: QuizItem[]

	// filter quizzed items that had a correct answer, only these count toward
	// the total
	$: quizzedCorrect = quizzed.filter((item) => item.isCorrectAnswer)

	$: progress =
		quizzedCorrect.length / (quizzedCorrect.length + unquizzed.length)

	$: style = `margin-right: ${(1 - roundN(progress, 2)) * 100}%`
</script>

{#if $settings.showProgressBar}
	<section
		aria-label="Progress toward completion (in percent)"
		class="progress-bg"
		role="progressbar"
		aria-valuenow={Math.floor(progress * 100)}
		aria-valuemin={0}
		aria-valuemax={100}
	>
		<div class="progress-fill" {style} aria-hidden="true" />
	</section>
{/if}

<style lang="postcss">
	.progress-bg {
		height: 4px;
		position: relative;
		overflow: hidden;
	}
	.progress-fill {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: var(--accent-color);
		transition: margin-right 150ms var(--standard-curve);
	}
</style>
