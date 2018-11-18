import {
  random,
  last,
} from 'lodash';

import {
  Pos,
  Direction,
} from 'types';
import {
  Matrix, applyDirectionToPos,
  randomDirection,
  isPosInsideOfMap,
  randomSiblingDirection,
} from 'utils';
import { mapSize } from 'constants/map';

// TODO: This should be a utility function.
function randomStartPos(): Pos {
  return {
    x: random(0, mapSize.x - 1),
    y: random(0, mapSize.y - 1),
  };
}

function randomStartDirection(): Direction {
  return randomDirection(false);
}

// true: continue
// false: should stop
function diggingCondition(nextPos: Pos, currentLength: number) {
  if (!isPosInsideOfMap(nextPos)) {
    return false;
  }
  // som crap calcs besed on currentLength maybe...
  if (currentLength > 40) {
    return false;
  }
  return true;
}

// allow to make decision based on several lastest positions.
function nextDiggingDirection(lastDirs: Direction[]): Direction {
  const lastDir = last(lastDirs) as Direction;
  const r = random(1, 3);
  return r < 2 ? lastDir : randomSiblingDirection(lastDir);
}

function digOneTunnel(matrix: Matrix) {
  let length = 1;
  const lastDirections: Direction[] = [];
  let nextPos;
  let digDirection: Direction;

  nextPos = randomStartPos();
  matrix.set(nextPos.x, nextPos.y, 1);
  digDirection = randomStartDirection();
  nextPos = applyDirectionToPos(nextPos, digDirection);
  while (diggingCondition(nextPos, length)) {
    matrix.set(nextPos.x, nextPos.y, 1);
    lastDirections.push(digDirection);
    length++;
    digDirection = nextDiggingDirection(lastDirections);
    nextPos = applyDirectionToPos(nextPos, digDirection);
  }
}

export function generateBinaryPathsMatrix() {
  const matrix = Matrix.create(mapSize.x, mapSize.y, 0);
  // TODO: obvious placeholder code beneath. Change!!!
  for (let i = 0; i < 11; i++) {
    digOneTunnel(matrix);
  }
  return matrix;
}
