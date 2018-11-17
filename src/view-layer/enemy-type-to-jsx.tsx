import * as React from 'react';

import { Enemy } from 'types';

export default (enemy: Enemy) => {
  let color: string;
  switch (enemy.hp) {
    case 0: return <span style={{ color: 'rgb(170,85,0)' }}>%</span>;
    case 1: color = 'rgb(255,0,0)'; break;
    default: color = 'rgb(0,255,0)';
  }
  switch (enemy.type) {
    case 'GOBLIN':
      return <span style={{ color }}>g</span>;
  }
};
