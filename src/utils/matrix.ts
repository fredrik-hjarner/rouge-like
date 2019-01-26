import { cloneDeep } from 'lodash';
import { Pos } from 'types';

export class Matrix {
  public static fromTwoDimensionalArray(array: any[][]): Matrix {
    const matrix = new Matrix();
    matrix._height = array.length;
    matrix._width = array[0].length;
    // matrix.matrix = cloneDeep(array);
    matrix.matrix = [];
    for (let i = 0; i < matrix.height; i++) {
      matrix.matrix.push(Array(matrix.width));
    }
    for (let x = 0; x < matrix.width; x++) {
      for (let y = 0; y < matrix.height; y++) {
        matrix.matrix[y][x] = array[y][x];
      }
    }
    return matrix;
  }

  public static create(x: number, y: number, initializedWithValue: any = 0): Matrix {
    const matrix = new Matrix();
    matrix.matrix = [];
    for (let i = 0; i < y; i++) {
      matrix.matrix.push(Array(x).fill(initializedWithValue));
    }
    matrix._width = x;
    matrix._height = y;
    return matrix;
  }

  private _height: number; // tslint:disable-line
  private _width: number; // tslint:disable-line

  public get height(): number {
    return this._height;
  }

  public get width(): number {
    return this._width;
  }

  private matrix: any[][];

  public toTwoDimensionalArray(): any[][] {
    return cloneDeep(this.matrix);
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

  public forEach(callback: (pos: Pos, value: any) => void): void {
    this.matrix.forEach(
      (line, y) => line.forEach(
        (val, x) => callback({ x, y }, val),
      ),
    );
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
