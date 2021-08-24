<script lang="ts">
	import Quiz from "./_Quiz.svelte"
	import Input from "./_Input.svelte"
	import Menu from "./_Menu.svelte"
	import SettingsModal from "./_SettingsModal.svelte"
	import { quiz } from "@/stores/quiz"
	import { isCorrectAnswer } from "@/lib/answer"
	import {
		loadProgressSound,
		playProgressSound,
		loadErrorSound,
		playErrorSound,
		loadMaximizeSound,
		loadMinimizeSound,
		loadVictorySound
	} from "@/lib/sound"
	import { randomInt } from "@/lib/random"
	import { settings } from "@/stores/settings"
	import ProgressBar from "./_ProgressBar.svelte"
	import { onMount } from "svelte"
	import { goto, prefetch } from "$app/navigation"

	let settingsModal: SettingsModal
	let input: string
	let streakLength = 0

	$: unquizzed = $quiz.unquizzed
	$: quizzed = $quiz.quizzed
	$: currentItem = unquizzed[0]

	function handleMenuEvent(event: CustomEvent) {
		switch (event.detail.type) {
			case "openSettings":
				settingsModal.open()
				break

			case "restart":
				quiz.reset()
				break

			default:
				break
		}
	}

	function handleSubmit(event: CustomEvent) {
		if (!currentItem) return
		const input = event.detail.input

		if (isCorrectAnswer(input, currentItem.kana)) {
			playProgressSound(streakLength)
			streakLength += 1
		} else {
			playErrorSound()
			streakLength = 0

			// Add item back at the end of queue at a random position;
			if ($settings.retryIncorrectAnswers) {
				const index = Math.min(randomInt(5, 12), unquizzed.length)
				quiz.insert(index, currentItem)
			}
		}

		quiz.pop((item) => ({
			...item,
			answered: input,
			isCorrectAnswer: isCorrectAnswer(input, item.kana)
		}))

		if (unquizzed.length < 5) {
			prefetch("summary")
			loadVictorySound()
		}
	}

	onMount(() => {
		loadProgressSound()
		loadErrorSound()
		loadMaximizeSound()
		loadMinimizeSound()
	})

	// go to results if queue is empty
	$: unquizzed.length === 0 && setTimeout(() => goto("summary"), 1000)
</script>

<svelte:head>
	<title>Session · Type Kana</title>
</svelte:head>

<ProgressBar {unquizzed} {quizzed} />
<Quiz {unquizzed} {quizzed} {input} />
<Input bind:input on:submit={handleSubmit} currentKana={currentItem?.kana} />
<Menu on:menuEvent={handleMenuEvent} />
<SettingsModal bind:this={settingsModal} />
