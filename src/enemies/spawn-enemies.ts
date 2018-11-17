import { random, uniq, cloneDeep } from 'lodash';

import { Pos } from 'types';
import store from 'redux/store';
import { mapSize } from 'constants/map';
import { isWalkable } from 'legal-move';
import { MapModule } from 'redux/modules';

type EnemiesArray = Array<{ type: string, pos: Pos }>;

export default (): EnemiesArray => {
  const spawnablePositions: Pos[] = [];

  for (let y = 0; y < mapSize.y; y++) {
    for (let x = 0; x < mapSize.x; x++) {
      const map = MapModule.selectors.map(store.getState());
      isWalkable(map, {x, y}) && spawnablePositions.push({ x, y });
    }
  }

  const spawnFactor = 0.10;
  const toRandomize = Math.round(spawnablePositions.length * spawnFactor);
  const randoms = uniq(
    Array(toRandomize).fill(0).map(() => random(0, spawnablePositions.length - 1)),
  );
  return randoms.map(r => {
    const pos = cloneDeep(spawnablePositions[r]);
    return { type: 'GOBLIN', pos, hp: 2 };
  });
};
