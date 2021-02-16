import Setup from "./routes/Setup.svelte";
import Session from "./routes/Session.svelte";
import NotFound from "./routes/NotFound.svelte";

export const routes = {
  '/': Setup,
  '/session': Session,
  '*': NotFound
};
