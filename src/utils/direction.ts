import { random } from 'lodash';

import { Direction, Pos } from 'types';

export function randomDirection(allowNowhere: boolean = true): Direction {
  switch (random(1, allowNowhere ? 9 : 8)) {
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

export function getSiblingDirections(direction: Direction): Direction[] {
  switch (direction) {
    case 'WEST': return ['SOUTHWEST', 'WEST', 'NORTHWEST'];
    case 'NORTHWEST': return ['WEST', 'NORTHWEST', 'NORTH'];
    case 'NORTH': return ['NORTHWEST', 'NORTH', 'NORTHEAST'];
    case 'NORTHEAST': return ['NORTH', 'NORTHEAST', 'EAST'];
    case 'EAST': return ['NORTHEAST', 'EAST', 'SOUTHEAST'];
    case 'SOUTHEAST': return ['EAST', 'SOUTHEAST', 'SOUTH'];
    case 'SOUTH': return ['SOUTHEAST', 'SOUTH', 'SOUTHWEST'];
    case 'SOUTHWEST':
    default: return ['SOUTH', 'SOUTHWEST', 'WEST'];
  }
}

export function randomSiblingDirection(direction: Direction): Direction {
  return getSiblingDirections(direction)[random(0, 2)];
}

export function directionFromTo(from: Pos, to: Pos): Direction {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dy === 0) {
    if (dx === 0) {
      return 'NOWHERE';
    } else if (dx < 0) {
      return 'WEST';
    } else { // dx > 0
      return 'EAST';
    }
  } else if (dy > 0) { // to is south of from
    if (dx === 0) {
      return 'SOUTH';
    } else if (dx < 0) {
      return 'SOUTHWEST';
    } else { // dx > 0
      return 'SOUTHEAST';
    }
  } else { // dy > 0
    if (dx === 0) {  // to is north of from
      return 'NORTH';
    } else if (dx < 0) {
      return 'NORTHWEST';
    } else { // dx > 0
      return 'NORTHEAST';
    }
  }
}
