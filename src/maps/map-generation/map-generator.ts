import { Matrix } from 'utils';
import { mapSize } from 'constants/map';
import { RoomGenerator } from './room-generator';

const roomGenerator = new RoomGenerator();

export const generateMap = () => {
  const map = Matrix.create(mapSize.x, mapSize.y, 'solid-stone');
  const rooms = roomGenerator.generate();

  // draw top walls
  rooms.forEach(({ x1, x2, y1 }) => {
    for (let x = x1; x <= x2; x++) {
      map.set(x, y1, 'horizontal-wall');
    }
  });

  // draw bottom walls
  rooms.forEach(({ x1, x2, y2 }) => {
    for (let x = x1; x <= x2; x++) {
      map.set(x, y2, 'horizontal-wall');
    }
  });

  // draw left walls
  rooms.forEach(({ x1, y1, y2 }) => {
    for (let y = y1; y <= y2; y++) {
      map.set(x1, y, 'vertical-wall');
    }
  });

  // draw right walls
  rooms.forEach(({ x2, y1, y2 }) => {
    for (let y = y1; y <= y2; y++) {
      map.set(x2, y, 'vertical-wall');
    }
  });

  // draw floor
  rooms.forEach(({ x1, x2, y1, y2 }) => {
    for (let x = x1 + 1; x <= x2 - 1; x++) {
      for (let y = y1 + 1; y <= y2 - 1; y++) {
        map.set(x, y, 'floor');
      }
    }
  });
  return map;
};