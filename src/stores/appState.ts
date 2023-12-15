import { writable } from "svelte/store";
import type { AppState } from "../types";
import { pathMap } from "../constants";

export const appState = writable<AppState>({
  height: 24,
  placement: "top",
  pathName: "curve",
  fillColor: "#4d4d4d",
  isFlipped: false,
});

export const wavePath = writable<string>(pathMap["wave"]);
export const hexWavePath = writable<string>(pathMap["hexWave"]);
export const sawtoothPath = writable<string>(pathMap["sawtooth"]);
export const squareWavePath = writable<string>(pathMap["squareWave"]);
