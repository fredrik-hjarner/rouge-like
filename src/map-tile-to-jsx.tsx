import { MapTile } from 'types';

export default (mapTile: MapTile) => {
  switch (mapTile) {
    case 'solid-stone': return ' ';
    case 'horizontal-wall': return '−';
    case 'vertical-wall': return '|';
    case 'floor': return '.';
  }
};
