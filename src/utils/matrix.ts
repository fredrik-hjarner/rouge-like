export class Matrix {
  public height: number;
  public width: number;

  private matrix: any[][];

  constructor(x: number, y: number, initializedWithValue: number = 0) {
    this.matrix = Array(y).fill(0).map(() => Array(x).fill(initializedWithValue));
  }

  public get(x: number, y: number) {
    return this.matrix[y][x];
  }

  public set(x: number, y: number, value: any) {
    this.matrix[y][x] = value;
  }

  public setAll(value: any) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.matrix[y][x] = value;
      }
    }
  }
}
