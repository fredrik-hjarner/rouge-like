import { random } from 'lodash';

import { Direction } from 'types';

export const randomDirection = (): Direction => {
  switch (random(1, 4)) {
    case 1: return 'EAST';
    case 2: return 'NORTH';
    case 3: return 'SOUTH';
    default: return 'WEST';
  }
};
