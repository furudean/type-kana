/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare interface KanaCheckbox {
	kana: string
	checked: boolean
}

declare type KanaCheckboxRow = KanaCheckbox[]

declare type KanaCheckboxColumn = KanaCheckboxRow[]
