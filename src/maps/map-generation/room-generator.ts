import { random } from 'lodash';

import { Pos, Rectangle } from 'types';
import { Matrix } from 'utils';
import { mapSize } from 'constants/map';

const numberOfRooms = 30; // to try
const minRoomDistance = 2;
const minRoomDimensions = {
  x: 6,
  y: 4,
};
const maxRoomDimensions = {
  x: 12,
  y: 8,
};
// mapSize.x - 1 = the highest x
// (minRoomDimensions.x - 1) because dim of 1 allows any startX
const highestStartX = mapSize.x - 1 - (minRoomDimensions.x - 1);
const highestStartY = mapSize.y - 1 - (minRoomDimensions.y - 1);

/**
 * This actually could probably be just a function.
 *
 * Best would be to use the 'function' key word so that order is irrelevant.
 */
export class RoomGenerator {
  private grid: Matrix;
  private rooms: Rectangle[] = [];

  public generate = () => {
    this.reset();
    for (let i = 0; i < numberOfRooms; i++) {
      // pick starting position
      const startPos = this.randomStartPos();
      const roomLeft = this.spaceLeft(startPos);
      const endPos = this.randomizeEndPos(startPos, roomLeft);
      this.createRoom(startPos, endPos);
    }
    return this.rooms;
  }

  // returns { x: 0, y: 0 } if no space left.
  private spaceLeft = (startPos: Pos) => ({
    x: mapSize.x - startPos.x - 1,
    y: mapSize.y - startPos.y - 1,
  })

  // TODO: this can end in an infinite loop
  private randomStartPos: () => Pos = () => {
    let pos;
    do {
      pos = {
        x: random(0, highestStartX),
        y: random(0, highestStartY),
      };
    } while (!this.isFree(pos));
    return pos;
  }

  // TODO: this can end in an infinite loop
  private randomizeEndPos = (startPos: Pos, roomLeft: Pos) => {
    let endPos;
    // do {
    endPos = {
      x: startPos.x + random(
        (minRoomDimensions.x - 1),
        Math.min(maxRoomDimensions.x - 1, roomLeft.x),
      ),
      y: startPos.y + random(
        (minRoomDimensions.y - 1),
        Math.min(maxRoomDimensions.y - 1, roomLeft.y),
      ),
    };
    // } while (!this.isFree(endPos));

    // Validation
    if (endPos.x < 0 || endPos.x >= mapSize.x) {
      debugger; // tslint:disable-line
      throw new Error(`endPos.x is out of bounds. endPos.x: ${endPos.x}, mapSize.x: ${mapSize.x}`);
    }
    if (endPos.y < 0 || endPos.y >= mapSize.y) {
      debugger; // tslint:disable-line
      throw new Error(`endPos.y is out of bounds. endPos.y: ${endPos.y}, mapSize.y: ${mapSize.y}`);
    }
    return endPos;
  }

  private isFree = (pos: Pos) => !this.grid.get(pos.x, pos.y);

  private fulfillsMinDistanceRequirement = (startPos: Pos, endPos: Pos) => {
    const extra = Math.round(minRoomDistance / 2);

    // make sure we're not outside of the map
    // I mean that we're not checking outside of the map.
    const x1 = Math.max(startPos.x - extra, 0);
    const x2 = Math.min(endPos.x + extra, mapSize.x - 1);
    const y1 = Math.max(startPos.y - extra, 0);
    const y2 = Math.min(endPos.y + extra, mapSize.y - 1);
    // check top
    for (let x = x1; x <= x2; x++) {
      if (!this.isFree({x, y: y1})) {
        return false;
      }
    }
    // check bottom
    for (let x = x1; x <= x2; x++) {
      if (!this.isFree({x, y: y2})) {
        return false;
      }
    }
    // check left
    for (let y = y1; y <= y2; y++) {
      if (!this.isFree({x: x1, y})) {
        return false;
      }
    }
    // check right
    for (let y = y1; y <= y2; y++) {
      if (!this.isFree({x: x2, y})) {
        return false;
      }
    }
    return true;
  }

  // if room was created -> true
  // if space already occupied -> false
  private createRoom = (startPos: Pos, endPos: Pos) => {
    // first check if all's free
    for (let x = startPos.x; x <= endPos.x; x++) {
      for (let y = startPos.y; y <= endPos.y; y++) {
        if (!this.isFree({x, y})) {
          return false;
        }
      }
    }

    if (!this.fulfillsMinDistanceRequirement(startPos, endPos)) {
      return false;
    }

    // if all's free then create
    for (let x = startPos.x; x <= endPos.x; x++) {
      for (let y = startPos.y; y <= endPos.y; y++) {
        this.grid.set(x, y, 1);
      }
    }
    this.rooms.push({
      x1: startPos.x,
      x2: endPos.x,
      y1: startPos.y,
      y2: endPos.y,
    });
  }

  private reset() {
    if (this.grid) {
      this.grid.setAll(0);
    } else {
      this.grid = Matrix.create(mapSize.x, mapSize.y, 0);
    }
    this.rooms = [];
  }
}
