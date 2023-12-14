import { derived, get, type Readable } from "svelte/store";
import { appState, hexWavePath, wavePath } from "./appState";
import { DEFAULT_DIVIDER_STYLE, pathMap } from "../constants"; // Adjust the import path as necessary
import type { AppState } from "../types";

function getTopValue(placement: string) {
  return placement === "top" ? "0px" : "auto";
}

function getBottomValue(placement: string) {
  return placement === "bottom" ? "0px" : "auto";
}

function getTransformValue(placement: string) {
  return placement === "bottom" ? "rotate(180deg)" : "rotate(0deg)";
}

export const svgPropertyMap: Readable<PropertyMap> = derived(
  appState,
  ($appState) => {
    return {
      ...DEFAULT_DIVIDER_STYLE.properties,
      top: getTopValue($appState.placement),
      bottom: getBottomValue($appState.placement),
      transform: getTransformValue($appState.placement),
      height: $appState.height + "px",
    };
  }
);

export const svgString = derived(
  [appState, wavePath, hexWavePath],
  ([$appState, $wavePath, $hexWavePath]) => {
    const top = getTopValue($appState.placement);
    const bottom = getBottomValue($appState.placement);
    const rotation = getTransformValue($appState.placement);
    const left = 0;

    let path = pathMap[$appState.pathName];

    if ($appState.pathName === "wave") {
      path = $wavePath;
    }
    if ($appState.pathName === "hexWave") {
      path = $hexWavePath;
    }

    return `
      <svg
        class="${DEFAULT_DIVIDER_STYLE.name}"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="${$appState.fillColor}"
        style="position: absolute; top: ${top}; left: ${left}px; bottom: ${bottom}; height: ${$appState.height}px; transform: ${rotation}; width: 100%;"
      >
        <path d="${path}" />
      </svg>
    `;
  }
);
