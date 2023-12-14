import { writable } from "svelte/store";
import type { AppState } from "../types";
import { pathMap } from "../constants";

export const appState = writable<AppState>({
  height: 32,
  placement: "top",
  pathName: "curve",
  activePath: pathMap["curve"],
  fillColor: "#4d4d4d",
});

export const wavePath = writable<string>(pathMap["wave"]);
export const hexWavePath = writable<string>(pathMap["hexWave"]);
