import { Matrix } from 'utils';
import { mapSize } from 'constants/map';
import { RoomGenerator } from './room-generator';
import { generateBinaryPathsMatrix } from './random-tunnel-generator';
import { Pos, Rectangle } from 'types';

function drawHorizontalWall(x: number, y: number, map: Matrix) {
  const tile = map.get(x, y) === 'path' ? 'floor' : 'horizontal-wall';
  map.set(x, y, tile);
}

function drawVerticalWall(x: number, y: number, map: Matrix) {
  const tile = map.get(x, y) === 'path' ? 'floor' : 'vertical-wall';
  map.set(x, y, tile);
}

function generateRooms(rooms: Rectangle[], map: Matrix) {
  // draw top walls
  rooms.forEach(({ x1, x2, y1 }) => {
    for (let x = x1; x <= x2; x++) {
      drawHorizontalWall(x, y1, map);
    }
  });

  // draw bottom walls
  rooms.forEach(({ x1, x2, y2 }) => {
    for (let x = x1; x <= x2; x++) {
      drawHorizontalWall(x, y2, map);
    }
  });

  // draw left walls
  rooms.forEach(({ x1, y1, y2 }) => {
    for (let y = y1; y <= y2; y++) {
      drawVerticalWall(x1, y, map);
    }
  });

  // draw right walls
  rooms.forEach(({ x2, y1, y2 }) => {
    for (let y = y1; y <= y2; y++) {
      drawVerticalWall(x2, y, map);
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
}

const roomGenerator = new RoomGenerator();

export const generateMap = () => {
  const map = Matrix.create(mapSize.x, mapSize.y, 'solid-stone');
  const rooms = roomGenerator.generate();
  const binaryPathsMap = generateBinaryPathsMatrix();

  // First draw the paths then let the rooms be drawn over them... I might improve the method later...
  binaryPathsMap.forEach(({ x, y }: Pos, bit: number) =>
    bit && map.set(x, y, 'path'),
  );

  generateRooms(rooms, map);
  return map;
};
