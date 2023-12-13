import type { Option, PathMap, PathName, Placement } from "./types";

export const pathMap: PathMap = {
  curve: "M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z",
  diagonal: "M1200 120L0 16.48 0 0 1200 0 1200 120z",
  wave: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
};

export const pathNameOptions: Option<PathName>[] = [
  { value: "curve", label: "Curve" },
  { value: "diagonal", label: "Diagonal" },
  { value: "wave", label: "Wave" },
];

export const placementOptions: Option<Placement>[] = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
];
