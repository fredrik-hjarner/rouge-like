import { random } from 'lodash';

import { Direction, Pos } from 'types';

export function randomDirection(): Direction {
  switch (random(1, 4)) {
    case 1: return 'EAST';
    case 2: return 'NORTH';
    case 3: return 'SOUTH';
    default: return 'WEST';
  }
}

export function applyDirectionToPos({ x, y }: Pos, direction: Direction): Pos {
  switch (direction) {
    case 'EAST': return { x: x + 1, y };
    case 'NORTH': return { x, y: y - 1 };
    case 'SOUTH': return { x, y: y + 1 };
    case 'WEST':
    default: return { x: x - 1, y };
  }
}
