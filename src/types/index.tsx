export type Pos = {
  x: number,
  y: number,
};

export type Rectangle = {
  x1: number,
  x2: number,
  y1: number,
  y2: number,
};

export type MapTile = 'solid-stone' | 'floor' | 'vertical-wall' | 'horizontal-wall';

export type Direction = 'WEST' | 'NORTH' | 'EAST' | 'SOUTH';
