import { map } from './maps/level2';
import { Pos } from 'types';

export const legalMove = ({x, y}: Pos): boolean => {
  const terrain = map.at(x, y);
  switch (terrain) {
    case 'solid-stone': return false;
    case 'horizontal-wall': return false;
    case 'vertical-wall': return false;

    case 'floor': return true;
  }
};
