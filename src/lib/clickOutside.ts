// https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7

/** `use:action` directive that calls `callback` when clicked outside of the element */
export function onClickOutside(node: HTMLElement, callback: (event: MouseEvent) => void) {
  function handleClick(event: MouseEvent) {
    if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
      callback(event);
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  }
}
