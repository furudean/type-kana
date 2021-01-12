import { quintOut } from 'svelte/easing';

export function fall(node: HTMLElement, { duration, delay }) {
  return {
    duration,
    delay,
    css(t: number): string {
      const eased = quintOut(t);

      return `
        transform: translateY(${(1 - eased) * -100}%);
        opacity: ${Math.min(eased * 2, 1)};
      `;
    },
  };
}
