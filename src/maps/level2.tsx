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
    switch (this.map.get(x, y)) {
      case 1: return '.';
      case 2: return '−';
      case 3: return '|';
      default: return ' ';
    }
  }
}

export const map = new Map();
