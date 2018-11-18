import { Pos } from 'types';
import { mapSize } from 'constants/map';

export function isPosInsideOfMap({x, y}: Pos) {
  return x >= 0 &&
    x < mapSize.x &&
    y >= 0 &&
    y < mapSize.y;
}
