import * as React from 'react';

import { EnemyType } from 'types';

export default (enemyType: EnemyType) => {
  switch (enemyType) {
    case 'GOBLIN':
    return (
      <span style={{ color: 'rgb(0,255,0)' }}>
        g
      </span>
    );
  }
};
