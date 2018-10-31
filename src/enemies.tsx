import { random, uniq, cloneDeep } from 'lodash';

import { Pos } from 'types';
import { legalMove } from 'legal-move';
import { map } from './map';

class Enemies {
  private spawnablePositions: Pos[] = [];
  private enemies: Pos[] = [];

  constructor() {
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        legalMove(x, y) && this.spawnablePositions.push({ x, y });
      }
    }

    this.spawn();
  }

  public at(pos: Pos): boolean {
    return !!this.enemies.find(e => e.x === pos.x && e.y === pos.y);
  }

  private spawn() {
    const spawnFactor = 0.10;
    const toRandomize = Math.round(this.spawnablePositions.length * spawnFactor);
    const randoms = uniq(
      Array(toRandomize).fill(0).map(() => random(0, this.spawnablePositions.length - 1)),
    );
    this.enemies = randoms.map(r => cloneDeep(this.spawnablePositions[r]));
  }
}

export default new Enemies();
