import { quintOut, quintIn } from 'svelte/easing';

export function drop(node: HTMLElement, { duration, delay = 0 }) {
  return {
    duration,
    delay,
    css(t: number): string {
      const eased = quintOut(t);

      return `
        transform: translateY(${(1 - eased) * -100}%);
        opacity: ${eased};
      `;
    },
  };
}
