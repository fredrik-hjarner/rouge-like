import { Pos } from 'types';
import { mapSize } from 'constants/map';

export function isPosInsideOfMap({x, y}: Pos) {
  return x >= 0 &&
    x < mapSize.x &&
    y >= 0 &&
    y < mapSize.y;
}

export function isSamePos(p1: Pos, p2: Pos) {
  return p1.x === p2.x && p1.y === p2.y;
}
