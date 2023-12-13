import { writable } from "svelte/store";
import type { AppState } from "../types";

export const appState = writable<AppState>({
  height: 32,
  placement: "top",
  pathName: "curve",
});
