import { IMatrix, MapTile } from 'types';
import { generateMap } from './map-generation';

class Map {
  public width = 77;
  public height = 19;

  private map: IMatrix;

  constructor() {
    this.map = generateMap();
  }

  public at(x: number, y: number): MapTile {
    switch (this.map.get(x, y)) {
      case 1: return 'floor';
      case 2: return 'horizontal-wall';
      case 3: return 'vertical-wall';
      default: return 'solid-stone';
    }
  }
}

export const map = new Map();
