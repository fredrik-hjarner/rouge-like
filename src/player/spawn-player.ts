import { random, cloneDeep } from 'lodash';

import { Pos } from 'types';
import store from 'redux/store';
import { mapSize } from 'constants/map';
import { isWalkable } from 'legal-move';
import { MapModule } from 'redux/modules';

export default (): Pos => {
  const spawnablePositions: Pos[] = [];

  for (let y = 0; y < mapSize.y; y++) {
    for (let x = 0; x < mapSize.x; x++) {
      const map = MapModule.selectors.map(store.getState());
      isWalkable(map, {x, y}) && spawnablePositions.push({ x, y });
    }
  }

  const randomIndex = random(0, spawnablePositions.length - 1);
  return cloneDeep(spawnablePositions[randomIndex]);
};
