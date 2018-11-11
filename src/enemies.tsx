import { random, uniq, cloneDeep } from 'lodash';

import { Pos } from 'types';
import { isWalkable } from 'legal-move';
import { map } from './maps/level1';
import { Enemy } from './enemies/enemy';
import { Goblin } from './enemies/goblin';

class Enemies {
  private spawnablePositions: Pos[] = [];
  private enemies: Enemy[] = [];

  constructor() {
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        isWalkable({x, y}) && this.spawnablePositions.push({ x, y });
      }
    }

    this.spawn();
  }

  public at(pos: Pos): Enemy | undefined {
    return this.enemies.find(e => e.pos.x === pos.x && e.pos.y === pos.y);
  }

  public AI() {
    this.enemies.forEach(e => e.AI());
  }

  private spawn() {
    const spawnFactor = 0.10;
    const toRandomize = Math.round(this.spawnablePositions.length * spawnFactor);
    const randoms = uniq(
      Array(toRandomize).fill(0).map(() => random(0, this.spawnablePositions.length - 1)),
    );
    this.enemies = randoms.map(r => {
      const pos = cloneDeep(this.spawnablePositions[r]);
      return new Goblin(pos);
    });
  }
}

export default new Enemies();
