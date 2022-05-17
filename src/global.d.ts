/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

/** @experimental - this is not available in some browsers */
declare interface HTMLDialogElement extends HTMLElement {
	open: boolean
	returnValue: string
	/**
	 * Closes the dialog element.
	 *
	 * The argument, if provided, provides a return value.
	 */
	close(returnValue?: string): void
	/** Displays the dialog element. */
	show(): void
	showModal(): void
	addEventListener<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (this: HTMLDialogElement, ev: HTMLElementEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	): void
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions
	): void
	removeEventListener<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (this: HTMLDialogElement, ev: HTMLElementEventMap[K]) => any,
		options?: boolean | EventListenerOptions
	): void
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions
	): void
}

declare interface KanaCheckbox {
	kana: string
	checked: boolean
}

declare type KanaCheckboxRow = KanaCheckbox[]

declare type KanaCheckboxColumn = KanaCheckboxRow[]
