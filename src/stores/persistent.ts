import { Writable, writable } from "svelte/store";
import { isObject } from "@/lib/util";

export interface Options {
  /** Key to save as in storage */
  key: string;
  /** 
   * Storage object to use. `localStorage` or `sessionStorage`.
   * 
   * @default "localStorage"
   */
  storage?: "localStorage" | "sessionStorage";
  /** 
   * Set `startValue`, then assign JSON in storage. 
   * 
   * This is useful when you want to assign new properties alongside old saved 
   * info.
   * 
   * @default false
   */
  assign?: boolean;
}

export type PersistentStoreValue = string | Record<string, any>;

const defaultOptions: Partial<Options> = {
  assign: false,
  storage: "localStorage"
}

function parseJSONSafe(value: string): any {
  try {
    return JSON.parse(value);
  } catch { }
}

export function createPersistentStore<T extends PersistentStoreValue>(
  options: Options,
  startValue: T,
): Writable<T> {
  const { key, storage, assign } = { ...defaultOptions, ...options }
  const { subscribe, set, update } = writable(startValue);

  if (process.browser) {
    const api = window[storage];
    const value = api.getItem(key);

    if (value !== null && isObject(startValue)) {
      const json = parseJSONSafe(value);

      if (json !== undefined) {
        // parse json
        set({
          ...assign && startValue as any,
          ...json
        });
      } else {
        // value is not JSON, set value as is
        set(value as unknown as T); // make compiler not freak out -- we know what we're doing here
      }
    }

    // save to storage on any new changes
    subscribe((current) => {
      api.setItem(
        options.key,
        isObject(startValue) ? JSON.stringify(current) : current as string
      );
    });
  }

  return {
    subscribe,
    set,
    update,
  }
}
