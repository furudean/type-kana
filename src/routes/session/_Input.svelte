<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { mdiChevronRight, mdiAutorenew } from "@mdi/js"
	import Icon from "@/lib/Icon.svelte"
	import { settings } from "@/stores/settings"
	import { getAnswers, isCorrectAnswer } from "@/lib/answer"

	export let input = ""
	export let currentKana: string = null

	const dispatch = createEventDispatcher()
	let blocked = false

	function handleSubmit() {
		if (blocked && !isCorrectAnswer(input, currentKana)) return

		if (
			!isCorrectAnswer(input, currentKana) &&
			$settings.autoCommit === "strict" &&
			$settings.mistakeDelayMs !== 0
		) {
			blocked = true
			setTimeout(() => (blocked = false), $settings.mistakeDelayMs)
		}

		dispatch("submit", { input })
		input = ""
	}

	function handleInput(event: any) {
		if (currentKana === null) return
		if (event.data === null) return // control key was pressed

		if (event.data === " ") {
			// space was pressed
			if (input !== " ") {
				input = input.trim()
			}
			handleSubmit()
		}

		const answers = getAnswers(currentKana)
		if (
			($settings.autoCommit !== "disabled" &&
				isCorrectAnswer(input, currentKana)) ||
			($settings.autoCommit === "strict" &&
				!answers.some((answer) => answer.startsWith(input)))
		) {
			handleSubmit()
		}
	}
</script>

<form
	class="answer-input content-width"
	on:submit|preventDefault={handleSubmit}
>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		class="text-field"
		bind:value={input}
		on:input={handleInput}
		placeholder="ローマ字入力"
		aria-label="Input rōmaji"
		lang="ja"
		autocapitalize="none"
		autocomplete="off"
		autocorrect="off"
		spellcheck={false}
		autofocus
	/>
	{#if $settings.autoCommit === "disabled"}
		<button type="submit" class="button" title="Submit">
			<Icon size="1em" path={mdiChevronRight} ariaHidden={true} />
		</button>
	{:else}
		<button
			type="button"
			class="button"
			title="Auto submit active. Tap to disable."
			on:click={() => settings.set({ ...$settings, autoCommit: "disabled" })}
		>
			<Icon
				size="0.75em"
				path={mdiAutorenew}
				color="var(--accent-color)"
				ariaHidden={true}
			/>
		</button>
	{/if}
</form>

<style lang="scss">
	.answer-input {
		display: flex;
		position: relative;
		background-color: var(--background-contrast);
		border-bottom: 2px solid var(--background-contrast-light);
		border-radius: var(--standard-border-radius);
		margin: 0 auto;
		font-size: 1.5em;
		box-sizing: border-box;
	}

	.text-field {
		margin: 0;
		width: 100%;
		text-align: center;
		height: 3em;
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;

		&:focus {
			outline: none;
		}
		&::placeholder {
			transition: 250ms var(--standard-curve) color;
			color: var(--text-color-light);
		}
		&:focus::placeholder {
			color: var(--text-color-lighter);
		}
	}

	.button {
		color: inherit;
		background: none;
		margin: 0;
		border: 0;
		padding: 0;
		font-size: 2em;
		width: 1.5em;
		height: 100%;
		cursor: pointer;

		position: absolute;
		right: 0;

		// center content
		display: flex;
		align-items: center;
		justify-content: center;

		&:focus {
			outline: var(--focus-color) solid 3px;
		}
	}
</style>
