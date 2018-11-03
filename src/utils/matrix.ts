import { IMatrix } from 'types';

export class Matrix implements IMatrix {
  public readonly height: number;
  public readonly width: number;

  private matrix: any[][];

  constructor(x: number, y: number, initializedWithValue: number = 0) {
    this.matrix = [];
    for (let i = 0; i < y; i++) {
      this.matrix.push(Array(x).fill(initializedWithValue));
    }
    this.width = x;
    this.height = y;
  }

  public get(x: number, y: number) {
    this.checkBounds(x, y);
    return this.matrix[y][x];
  }

  public set(x: number, y: number, value: any) {
    this.checkBounds(x, y);
    this.matrix[y][x] = value;
  }

  public setAll(value: any) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.matrix[y][x] = value;
      }
    }
  }

  private checkBounds(x: number, y: number) {
    if (x < 0 || x >= this.width) {
      debugger; // tslint:disable-line
      throw new Error(`x is out of bounds. x: ${x}, width: ${this.width}`);
    }
    if (y < 0 || y >= this.height) {
      debugger; // tslint:disable-line
      throw new Error(`y is out of bounds. y: ${y}, height: ${this.height}`);
    }
  }
}
