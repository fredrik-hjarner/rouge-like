import { random } from 'lodash';

import { Pos, Rectangle } from 'types';
import { Matrix } from 'utils';
import { mapSize } from 'constants/map';

const numberOfRooms = 25;
const minRoomDimension = 4;
const maxRoomDimensions = {
  x: 20,
  y: 10,
};
const highestStartX = mapSize.x - 1 - minRoomDimension;
const highestStartY = mapSize.y - 1 - minRoomDimension;

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

  private spaceLeft = (startPos: Pos) => ({
    x: mapSize.x - startPos.x - 1,
    y: mapSize.y - startPos.y - 1,
  })

  private randomStartPos: () => Pos = () => ({
    x: random(0, highestStartX),
    y: random(0, highestStartY),
  })

  private randomizeEndPos = (startPos: Pos, roomLeft: Pos) => {
    const endPos = {
      x: startPos.x + random(minRoomDimension, Math.min(maxRoomDimensions.x - 1, roomLeft.x)),
      y: startPos.y + random(minRoomDimension, Math.min(maxRoomDimensions.y - 1, roomLeft.y)),
    };
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

  // if room was created -> true
  // if space already occupied -> false
  private createRoom = (startPos: Pos, endPos: Pos) => {
    // first check if all's free
    for (let x = startPos.x; x < endPos.x; x++) {
      for (let y = startPos.y; y < endPos.y; y++) {
        if (!this.isFree({x, y})) {
          return false;
        }
      }
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
