import type { Option, PathMap, PathName, Placement } from "./types";

export const pathMap: PathMap = {
  curve:
    "M 0, -10 V 7.23 C 0,65.52 268.63,112.77 600,112.77 S 1200,65.52 1200,7.23 V -10 Z",
  diagonal: "M 1200 120 L 0 16.48 0 -10 1200 -10 1200 120z",
  wave: "M 0 -10 L 0 0 C 0 0 0 0 0 0 C 133.33 0 266.67 116.53 400 116.53 C 533.33 116.53 666.67 13.47 800 13.47 C 933.33 13.47 1066.67 89.42 1200 89.42 L 1200 0 L 1200 -10 Z",
  hexWave:
    "M 0 -10 L 0 0 L 0 0 0 0 0 0 L 133.33 0 266.67 116.53 400 116.53 L 533.33 116.53 666.67 13.47 800 13.47 L 933.33 13.47 1066.67 89.42 1200 89.42 L 1200 0 L 1200 -10 Z",
};

export const pathNameOptions: Option<PathName>[] = [
  { value: "curve", label: "Curve" },
  { value: "diagonal", label: "Diagonal" },
  { value: "wave", label: "Wave" },
  { value: "hexWave", label: "Hex Wave" },
];

export const placementOptions: Option<Placement>[] = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
];

export const DEFAULT_SECTION_STYLE = {
  name: "section-divider-bae_position-relative",
  properties: {
    position: "relative",
  },
};

export const DEFAULT_STYLE_PROPERTIES: PropertyMap = {
  position: "absolute",
  top: "0px",
  left: "0px",
  bottom: "auto",
  height: "32px",
  transform: "rotateZ(0deg)",
  width: "100%",
  "overflow-x": "hidden",
  "overflow-y": "hidden",
};

export const DEFAULT_DIVIDER_STYLE = {
  name: "section-divider-bae_divider",
  properties: { ...DEFAULT_STYLE_PROPERTIES },
};
