import { IMatrix } from 'types';
import { generateMap } from 'map-generator';

class Map {
  public width = 77;
  public height = 19;

  private map: IMatrix;

  constructor() {
    this.map = generateMap();
  }

  public at(x: number, y: number): string {
    return this.map.get(x, y) ? '.' : ' ';
  }
}

export const map = new Map();
