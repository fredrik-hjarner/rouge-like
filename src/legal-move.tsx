import { Pos } from 'types';
import { Matrix } from 'utils';

export const isWalkable = (map: Matrix, {x, y}: Pos): boolean => {
  const terrain = map.get(x, y);
  switch (terrain) {
    case 'floor': return true;
    default: return false;
  }
};
