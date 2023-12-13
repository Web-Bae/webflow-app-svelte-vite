export type PathName = "curve" | "diagonal" | "wave";
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
};
