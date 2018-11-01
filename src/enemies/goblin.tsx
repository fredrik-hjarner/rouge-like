import * as React from 'react';

import { Pos } from 'types';
import { Enemy } from './enemy';

export class Goblin implements Enemy {
  public hp: number = 3;
  public pos: Pos;

  constructor(pos: Pos) {
    this.pos = pos;
  }

  public render() {
    return (
      <span style={{ color: 'rgb(0,255,0)' }}>
        g
      </span>
    );
  }

  public AI() {
    return;
  }
}
