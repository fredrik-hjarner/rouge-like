import { Pos, MapTile } from 'types';
import { Matrix } from 'utils';

export const isWalkable = (map: Matrix, {x, y}: Pos): boolean => {
  const terrain: MapTile = map.get(x, y);
  switch (terrain) {
    case 'floor': return true;
    case 'path': return true;
    default: return false;
  }
};
