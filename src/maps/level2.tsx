import { MapGenerator } from 'map-generator';

class Map {
  public width = 77;
  public height = 19;

  private gen: MapGenerator;

  constructor() {
    this.gen = new MapGenerator();
    this.gen.generate();
  }

  public at(x: number, y: number): string {
    return this.gen.at(x, y) ? '.' : ' ';
  }
}

export const map = new Map();
