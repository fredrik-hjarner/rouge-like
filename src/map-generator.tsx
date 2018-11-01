import { random } from 'lodash';

import { Pos } from 'types';
import { Matrix } from 'utils';

const mapSize = { x: 77, y: 19};
const numberOfRooms = 4;
const minRoomDimension = 4;
const maxRoomDimension = 20;
const highestStartX = mapSize.x - 1 - minRoomDimension;
const highestStartY = mapSize.y - 1 - minRoomDimension;

export class MapGenerator {
  private grid: Matrix;
  private rooms: any[] = []; // beter type

  constructor() {
    this.grid = new Matrix(mapSize.x, mapSize.y, 0);
  }

  public generate = () => {
    this.grid = new Matrix(mapSize.x, mapSize.y, 0);

    for (let i = 0; i < numberOfRooms; i++) {
      // pick starting position
      const startPos = this.randomStartPos();
      const roomLeft = this.spaceLeft(startPos);
      const endPos = this.randomizeEndPos(startPos, roomLeft);
      this.createRoom(startPos, endPos);
    }
  }

  public at = (x: number, y: number) => this.grid.get(x, y); // TODO: remove this func?

  private spaceLeft = (startPos: Pos) => ({
    x: mapSize.x - startPos.x,
    y: mapSize.y - startPos.y,
  })

  private randomStartPos: () => Pos = () => ({
    x: random(0, highestStartX),
    y: random(0, highestStartY),
  })

  private randomizeEndPos = (startPos: Pos, roomLeft: Pos) => ({
    x: startPos.x + random(minRoomDimension, Math.min(maxRoomDimension, roomLeft.x)),
    y: startPos.y + random(minRoomDimension, Math.min(maxRoomDimension, roomLeft.y)),
  })

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
    for (let x = startPos.x; x < endPos.x; x++) {
      for (let y = startPos.y; y < endPos.y; y++) {
        this.grid.set(x, y, 1);
      }
    }
    this.rooms.push({startPos, endPos});
  }
}
