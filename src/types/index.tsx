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

export type Direction = 'WEST' | 'NORTHWEST' | 'NORTH' | 'NORTHEAST' | 'EAST' | 'SOUTHEAST' | 'SOUTH' | 'SOUTHWEST';

export type EnemyType = 'GOBLIN';

export type Enemy = {
  id: string,
  type: string,
  pos: Pos,
  hp: number,
};
