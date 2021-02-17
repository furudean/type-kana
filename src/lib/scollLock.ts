import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";

export function scrollLock(element: HTMLElement) {
  disableBodyScroll(element);

  return {
    destroy() {
      enableBodyScroll(element);
    }
  }
}
