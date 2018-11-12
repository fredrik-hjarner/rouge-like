import { put, take } from 'redux-saga/effects';

import { MapTile } from 'types';
import { Matrix } from 'utils';
import { mapSize } from 'constants/map';
import { generateMap } from 'maps/map-generation';

type SetMapAction = { type: 'SET_MAP', payload: { map: MapTile[][] } };

export type MapAction = SetMapAction;

export type MapState = {
  map: MapTile[][],
};

type State = {
  map: MapState,
};

export class MapModule {
  public static actions = {
    setMap: (map: MapTile[][]): SetMapAction => ({ type: 'SET_MAP', payload: { map } }),
  };

  public static selectors = {
    // TODO: do some reselect stuff here to not recreate the array all the time.
    map: (state: State): Matrix => Matrix.fromTwoDimensionalArray(state.map.map),
  };

  public static reducer(state: MapState = MapModule.initialState, action: MapAction): MapState {
    switch (action.type) {
      case 'SET_MAP':
        return {
          ...state,
          map: action.payload.map,
        };
      default:
        return state;
    }
  }

  private static initialState: MapState = {
    map: Array(mapSize.y).fill(0).map(() => Array(mapSize.x).fill('solid-stone')),
  };
}

// TODO: use action creators and constants.
export function* mapSaga() {
  while (true) {
    yield take('GEN_MAP');
    const map = generateMap().toTwoDimensionalArray();
    yield put(MapModule.actions.setMap(map));
    yield put({ type: 'GEN_MAP_FINISHED' });
  }
}
