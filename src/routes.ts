import Setup from "./routes/setup/index.svelte";
import Session from "./routes/session/index.svelte";
import NotFound from "./routes/NotFound.svelte";

export const routes = {
  '/': Setup,
  '/session': Session,
  '*': NotFound
};
