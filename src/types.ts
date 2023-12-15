export type PathName =
  | "curve"
  | "diagonal"
  | "wave"
  | "hexWave"
  | "sawtooth"
  | "squareWave";
export type Placement = "top" | "bottom";
export type PathMap = Record<PathName, string>;

export type Option<T extends string> = {
  value: T;
  label: string;
};

export type AppState = {
  height: number;
  placement: Placement;
  pathName: PathName;
  fillColor: string;
  isFlipped: boolean;
};
