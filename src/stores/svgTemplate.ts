import { derived, get, type Readable } from "svelte/store";
import {
  appState,
  hexWavePath,
  wavePath,
  sawtoothPath,
  squareWavePath,
} from "./appState";
import { DEFAULT_DIVIDER_STYLE, pathMap } from "../constants"; // Adjust the import path as necessary

function getTopValue(placement: string) {
  return placement === "top" ? "0px" : "auto";
}

function getBottomValue(placement: string) {
  return placement === "bottom" ? "0px" : "auto";
}

function getTransformValue(placement: string, isFlipped: boolean) {
  const xDegrees = "0";
  const yDegrees = isFlipped ? "180" : "0";
  const zDegrees = placement === "bottom" ? "180" : "0";
  return `rotateX(${xDegrees}deg) rotateY(${yDegrees}deg) rotateZ(${zDegrees}deg)`;
}

export const svgPropertyMap: Readable<PropertyMap> = derived(
  appState,
  ($appState) => {
    return {
      ...DEFAULT_DIVIDER_STYLE.properties,
      color: $appState.fillColor,
      top: getTopValue($appState.placement),
      bottom: getBottomValue($appState.placement),
      transform: getTransformValue($appState.placement, $appState.isFlipped),
      height: $appState.height + "px",
    };
  }
);

export const svgString = derived(
  [appState, wavePath, hexWavePath, sawtoothPath, squareWavePath],
  ([$appState, $wavePath, $hexWavePath, $sawtoothPath, $squareWavePath]) => {
    const top = getTopValue($appState.placement);
    const bottom = getBottomValue($appState.placement);
    const rotation = getTransformValue(
      $appState.placement,
      $appState.isFlipped
    );
    const left = 0;

    let path = pathMap[$appState.pathName];

    if ($appState.pathName === "wave") {
      path = $wavePath;
    }
    if ($appState.pathName === "hexWave") {
      path = $hexWavePath;
    }
    if ($appState.pathName === "sawtooth") {
      path = $sawtoothPath;
    }
    if ($appState.pathName === "squareWave") {
      path = $squareWavePath;
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
