import * as React from 'react';

import { Enemy } from 'types';

export default (enemy: Enemy) => {
  const color = enemy.hp <= 1 ? 'rgb(255,0,0)' : 'rgb(0,255,0)';
  switch (enemy.type) {
    case 'GOBLIN':
      return <span style={{ color }}>g</span>;
  }
};
