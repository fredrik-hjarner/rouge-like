import { Matrix } from 'utils';
import { RoomGenerator } from './room-generator';

const mapSize = { x: 77, y: 19};
const roomGenerator = new RoomGenerator();

export const generateMap = () => {
  const map = new Matrix(mapSize.x, mapSize.y);
  const rooms = roomGenerator.generate();

  // draw top walls
  rooms.forEach(({ x1, x2, y1 }) => {
    for (let x = x1; x <= x2; x++) {
      map.set(x, y1, 2);
    }
  });

  // draw bottom walls
  rooms.forEach(({ x1, x2, y2 }) => {
    for (let x = x1; x <= x2; x++) {
      map.set(x, y2, 2);
    }
  });

  // draw left walls
  rooms.forEach(({ x1, y1, y2 }) => {
    for (let y = y1; y <= y2; y++) {
      map.set(x1, y, 3);
    }
  });

  // draw right walls
  rooms.forEach(({ x2, y1, y2 }) => {
    for (let y = y1; y <= y2; y++) {
      map.set(x2, y, 3);
    }
  });

  // draw floor
  rooms.forEach(({ x1, x2, y1, y2 }) => {
    for (let x = x1 + 1; x <= x2 - 1; x++) {
      for (let y = y1 + 1; y <= y2 - 1; y++) {
        map.set(x, y, 1);
      }
    }
  });
  return map;
};
