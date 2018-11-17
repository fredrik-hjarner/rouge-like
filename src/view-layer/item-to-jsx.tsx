import * as React from 'react';

import { Item } from 'types';

export default (item: Item) => {
  switch (item.type) {
    case 'GOBLIN_CORPSE':
    default: return <span style={{ color: 'rgb(200,200,200)' }}>†</span>;
  }
};
