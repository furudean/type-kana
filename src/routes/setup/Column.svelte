<script lang="ts">
	import { playCheckboxSelectSeriesSound } from "$/lib/sound"
	import Checkbox from "$/components/Checkbox.svelte"
	import Row from "./Row.svelte"

	interface Props {
		rows: KanaCheckboxRow[];
		label: string;
	}

	let { rows = $bindable(), label }: Props = $props();

	let animationDelay = $state(0)

	function isRowSelected(row: KanaCheckboxRow): boolean {
		return row.filter((item) => item !== null).every((item) => item.checked)
	}

	function selectRow(state: boolean) {
		return function (row: KanaCheckboxRow) {
			animationDelay = 15
			return row.map((item) => {
				if (item === null) return null
				return { ...item, checked: state }
			})
		}
	}

	function onAnimationFinished() {
		animationDelay = 0
	}
</script>

<section class="column" aria-label={label}>
	<div class="row select-all">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label>
			<Checkbox
				checked={rows.every(isRowSelected)}
				onclick={() => {
					const everyRowChecked = rows.every(isRowSelected)
					rows = rows.map(selectRow(!everyRowChecked))

					playCheckboxSelectSeriesSound(8, !everyRowChecked)
				}}
			/>
			<span>Select all</span>
		</label>
	</div>
	{#each rows as row, index}
		<Row
			bind:row={rows[index]}
			animationDelay={animationDelay * index}
			onanimationFinished={() => { if (index === rows.length - 1) onAnimationFinished() }}
		/>
	{/each}
</section>

<style lang="postcss">
	.column {
		display: inline-block;
		margin-bottom: 3em;
	}

	.select-all {
		user-select: none;
		margin-bottom: 1.25em;
		font-weight: 500;
	}

	.select-all label {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.column :global(.row) {
		display: flex;
		align-items: center;

		&:not(:last-child):not(.select-all) {
			margin-bottom: 10px;
		}
	}

	/* checkbox */
	.column :global(.row .checkbox) {
		margin-right: 20px;
		font-size: 1.25em;
	}

	.column :global(.row > .checkbox-kana:not(:last-child)) {
		margin-right: 10px;
	}
</style>
