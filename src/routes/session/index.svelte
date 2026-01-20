<script lang="ts">
	import Quiz from "./_Quiz.svelte"
	import Input from "./_Input.svelte"
	import Menu from "./_Menu.svelte"
	import SettingsModal from "./_SettingsModal.svelte"
	import { quiz } from "$/stores/quiz"
	import { isCorrectAnswer } from "$/lib/answer"
	import {
		loadProgressSound,
		playProgressSound,
		loadErrorSound,
		playErrorSound,
		loadMaximizeSound,
		loadMinimizeSound,
		loadVictorySound,
		loadHiraganaSound,
		playKanaSound
	} from "$/lib/sound"
	import { randomInt } from "$/lib/random"
	import { settings } from "$/stores/settings"
	import ProgressBar from "$/components/ProgressBar.svelte"
	import { onMount, tick } from "svelte"
	import { goto, prefetch } from "$app/navigation"
	import { confettiAtCoordinates } from "$/lib/confetti"

	const ALPHANUMERIC = /^[a-z0-9]+$/i

	let settingsModal: SettingsModal
	let input: string
	let streakLength = 0
	let inputElement: HTMLInputElement
	let lastQuizzedElement: HTMLDivElement
	let time = Date.now()

	$: unquizzed = $quiz.unquizzed
	$: quizzed = $quiz.quizzed
	$: currentItem = unquizzed[0]

	function handleMenuEvent(event: CustomEvent) {
		switch (event.detail.type) {
			case "openSettings":
				settingsModal.show()
				break

			case "restart":
				quiz.reset()
				break

			default:
				break
		}
	}

	function confettiAtCurrent() {
		if (!$settings.confetti) return

		const { y, x, height, width } = lastQuizzedElement.getBoundingClientRect()

		const confettiY = y + height / 2 + 20 * window.devicePixelRatio
		const confettiX = x + width / 2

		confettiAtCoordinates(
			{ y: confettiY, x: confettiX },
			{
				gravity: 1,
				spread: 70,
				particleCount: 6,
				startVelocity: 10,
				ticks: 25,
				decay: 0.9
			}
		)
	}

	async function handleSubmit(event: CustomEvent) {
		if (!currentItem) return
		const input = event.detail.input
		const isCorrect = isCorrectAnswer(input, currentItem.kana)

		if (isCorrect) {
			playProgressSound(streakLength)
			playKanaSound(currentItem.kana)
			streakLength += 1
		} else {
			playErrorSound()
			streakLength = 0

			// Add item back at the end of queue at a random position
			if ($settings.retryIncorrectAnswers) {
				const index = Math.min(randomInt(5, 12), unquizzed.length)
				quiz.insert(index, currentItem)
			}
		}

		quiz.pop((item) => ({
			...item,
			answered: input,
			isCorrectAnswer: isCorrectAnswer(input, item.kana),
			duration: item.duration ?? 0 + Date.now() - time
		}))

		// Reset time for next kana
		time = Date.now()

		if (unquizzed.length < 5) {
			prefetch("summary")
			loadVictorySound()
		}

		await tick()
		isCorrect && confettiAtCurrent()
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.isComposing) return

		if (
			document.activeElement !== inputElement &&
			event.key !== " " && // skip if space
			event.key.length === 1 && // skip if control character
			ALPHANUMERIC.test(event.key)
		) {
			inputElement.focus()
		}
	}

	onMount(() => {
		loadProgressSound()
		loadErrorSound()
		loadMaximizeSound()
		loadMinimizeSound()
		loadHiraganaSound()
	})

	// go to results if queue is empty
	$: unquizzed.length === 0 && setTimeout(() => goto("summary"), 500)
</script>

<svelte:head>
	<title>Session · Type Kana</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<ProgressBar />
<Quiz {unquizzed} {quizzed} {input} bind:lastQuizzedElement />
<Input
	bind:input
	on:submit={handleSubmit}
	currentKana={currentItem?.kana}
	bind:inputElement
/>
<Menu on:menuEvent={handleMenuEvent} />
<SettingsModal bind:this={settingsModal} />
