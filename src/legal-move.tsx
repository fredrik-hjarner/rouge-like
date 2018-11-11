import { map } from './maps/level2';
import { Pos } from 'types';

export const isWalkable = ({x, y}: Pos): boolean => {
  const terrain = map.at(x, y);
  switch (terrain) {
    case 'floor': return true;
    default: return false;
  }
};
