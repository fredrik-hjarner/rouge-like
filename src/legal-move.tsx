import { map } from './maps/level2';

type LegalMove = (x: number, y: number) => boolean;

export const legalMove: LegalMove = (x, y) => {
  const terrain = map.at(x, y);
  switch (terrain) {
    case ' ': return false;
    case '−': return false;
    case '|': return false;

    case '.': return true;
    case '#': return true;
    default: return false;
  }
};
