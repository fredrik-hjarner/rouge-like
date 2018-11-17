import { random } from 'lodash';

import { Direction, Pos } from 'types';

export function randomDirection(): Direction {
  switch (random(1, 9)) {
    case 1: return 'WEST';
    case 2: return 'NORTHWEST';
    case 3: return 'NORTH';
    case 4: return 'NORTHEAST';
    case 5: return 'EAST';
    case 6: return 'SOUTHEAST';
    case 7: return 'SOUTH';
    case 8: return 'SOUTHWEST';
    default: return 'NOWHERE';
  }
}

export function applyDirectionToPos({ x, y }: Pos, direction: Direction): Pos {
  switch (direction) {
    case 'NOWHERE': return { x, y };
    case 'WEST': return { x: x - 1, y };
    case 'NORTHWEST': return { x: x - 1, y: y - 1 };
    case 'NORTH': return { x, y: y - 1 };
    case 'NORTHEAST': return { x: x + 1, y: y - 1 };
    case 'EAST': return { x: x + 1, y };
    case 'SOUTHEAST': return { x: x + 1, y: y + 1 };
    case 'SOUTH': return { x, y: y + 1 };
    case 'SOUTHWEST': return { x: x - 1, y: y + 1 };
    case 'WEST':
    default: return { x: x - 1, y };
  }
}
