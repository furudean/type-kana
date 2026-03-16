<script lang="ts">
	import Quiz from "./Quiz.svelte"
	import Input from "./Input.svelte"
	import Menu from "./Menu.svelte"
	import SettingsModal from "./SettingsModal.svelte"
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
	import { goto, preloadData } from "$app/navigation"
	import { confettiAtCoordinates } from "$/lib/confetti"

	const ALPHANUMERIC = /^[a-z0-9]+$/i

	let settingsModal: SettingsModal
	let input = $state("")
	let streakLength = 0
	let inputElement: HTMLInputElement | undefined = $state()
	let lastQuizzedElement: HTMLDivElement | undefined = $state()
	let time = Date.now()

	let unquizzed = $derived($quiz.unquizzed)
	let quizzed = $derived($quiz.quizzed)
	let currentItem = $derived(unquizzed[0])

	function handleMenuEvent({ type }: { type: string }) {
		switch (type) {
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
		if (!lastQuizzedElement) return

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

	async function handleSubmit({ input }: { input: string }) {
		if (!currentItem) return
		const isCorrect = isCorrectAnswer(input, currentItem.kana)

		if (isCorrect) {
			playProgressSound(streakLength)
			playKanaSound(currentItem.kana)
			streakLength += 1
		} else {
			playErrorSound()
			playKanaSound(currentItem.kana)
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
			preloadData("/summary")
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
			inputElement?.focus()
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
	$effect(() => {
		unquizzed.length === 0 && setTimeout(() => goto("summary"), 500)
	})
</script>

<svelte:head>
	<title>Session · Type Kana</title>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<ProgressBar />
<Quiz {unquizzed} {quizzed} {input} bind:lastQuizzedElement />
<Input
	bind:input
	onsubmit={handleSubmit}
	currentKana={currentItem?.kana}
	bind:inputElement
/>
<Menu onmenuEvent={handleMenuEvent} />
<SettingsModal bind:this={settingsModal} />
