import { oneLine } from 'common-tags';

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => { setTimeout(resolve, ms) });
}

/** Returns a throttled version of `fn`, skipping calls that happen within 
 * `ms` milliseconds. */
export function throttle<F extends Function>(
  fn: F,
  ms: number
): F {
  let isWaiting = false;

  return function (...args: any[]) {
    if (!isWaiting) {
      isWaiting = true;

      fn.apply(this, args);

      setTimeout(() => {
        isWaiting = false;
      }, ms);
    }
  } as any; // Cast needed for compiler to not freak out
}

export function svgToDataUrl(path: string, viewBox = "0 0 24 24") {
  const svg = oneLine`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
      <path d="${path}"></path>
    </svg>
  `;

  return "data:image/svg+xml," + encodeURI(svg);
}
