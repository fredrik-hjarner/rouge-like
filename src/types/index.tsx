export type Pos = {
  x: number,
  y: number,
};

export type Rectangle = {
  x1: number,
  x2: number,
  y1: number,
  y2: number,
};

export interface IMatrix {
  height: number;
  width: number;

  // constructor(x: number, y: number, initializedWithValue: number = 0) {
  //   this.matrix = Array(y).fill(0).map(() => Array(x).fill(initializedWithValue));
  // }

  get: (x: number, y: number) => any;
  set: (x: number, y: number, value: any) => void;
  setAll: (value: any) => void;
}
