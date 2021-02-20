import { Writable, writable } from "svelte/store";
import { isObject } from "@/lib/util";

function parseJSONSafe(value: string): any {
  try {
    return JSON.parse(value);
  } catch { }
}

export interface Options {
  /** Key to save as in storage */
  key: string;
  /** 
   * `localStorage` or `sessionStorage`
   * 
   * @default localStorage
   */
  storage?: Storage;
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

export interface WebStorageStore<T> extends Writable<T> {
  useWebStorageAPI(): void;
}

export function createPersistentStore<T>(key: string, startValue: T): WebStorageStore<T>;
export function createPersistentStore<T>(options: Options, startValue: T): WebStorageStore<T>
export function createPersistentStore<T>(
  optionsOrKey: string | Options,
  startValue: T
): WebStorageStore<T> {

  const options: Options = {
    key: undefined,
    storage: localStorage,
    assign: false,
    ...(isObject(optionsOrKey) ?
      optionsOrKey as Options :
      { key: optionsOrKey as string })
  };
  const { key, storage, assign } = options;

  const value = storage.getItem(key);
  const { subscribe, set, update } = writable(startValue);

  function useWebStorageAPI() {
    if (value !== null) {
      const json = parseJSONSafe(value);

      if (json !== undefined) {
        // parse json
        set({
          ...(assign ? startValue : {}),
          ...json
        });
      } else {
        // value is not JSON, set value as is
        set(value as unknown as T); // make compiler not freak out -- we know what we're doing here
      }
    }

    // save to storage on any new changes
    subscribe((current) => {
      storage.setItem(key, isObject(current) ? JSON.stringify(current) : current.toString());
    });
  }

  return {
    subscribe,
    set,
    update,
    useWebStorageAPI,
  }
}
