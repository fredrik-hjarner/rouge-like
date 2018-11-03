import { Matrix } from 'utils';
import { RoomGenerator } from './room-generator';

const mapSize = { x: 77, y: 19};
const roomGenerator = new RoomGenerator();

export const generateMap = () => {
  const map = new Matrix(mapSize.x, mapSize.y);
  const rooms = roomGenerator.generate();
  rooms.forEach(({ x1, x2, y1, y2 }) => {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        map.set(x, y, 1);
      }
    }
  });
  return map;
};
