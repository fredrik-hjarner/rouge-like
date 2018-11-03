import { map } from './maps/level2';

type LegalMove = (x: number, y: number) => boolean;

export const legalMove: LegalMove = (x, y) => {
  const terrain = map.at(x, y);
  switch (terrain) {
    case 'solid-stone': return false;
    case 'horizontal-wall': return false;
    case 'vertical-wall': return false;

    case 'floor': return true;
  }
};
