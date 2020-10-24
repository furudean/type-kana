import { Readable, derived } from 'svelte/store'
import { settings } from './settings'

/**
 * Inspiration from
 * https://github.com/DylanVann/perfect-dark-mode/blob/64f6c5c296254ee36f8df36e6a82ed1da7b883f0/packages/perfect-dark-mode/src/createPerfectDarkMode.ts#L98
 */
function createOSThemeStore(): Readable<string> {
  const listeners = new Set<(theme: string) => any>();
  const mediaQuery = matchMedia('(prefers-color-scheme: dark)');
  let colorScheme = mediaQuery.matches ? 'dark' : 'light'; // assumes that "light" is the default

  function onChangeMediaQuery(event: MediaQueryListEvent): void {
    colorScheme = event.matches ? 'dark' : 'light';
    listeners.forEach(listener => { listener(colorScheme) });
  }

  mediaQuery.addEventListener('change', onChangeMediaQuery);

  return {
    subscribe(listener) {
      listeners.add(listener);
      listener(colorScheme); // send value to new listener
      return function unsubscribe() {
        listeners.delete(listener)
      }
    }
  }
}

export const osTheme = createOSThemeStore();

export const resolvedTheme = derived([osTheme, settings], ([$osTheme, $settings]) => {
  return $settings.theme === 'same-as-system' ? $osTheme : $settings.theme;
});
