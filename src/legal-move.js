import { map } from './map';

export const legalMove : boolean = (x: number, y: number) => {
  const terrain = map.at(x, y);
  switch (terrain) {
    case ' ': return false;
    case '_': return false;
    case '|': return false;

    case '.': return true;
    case '#': return true;
  }
};
