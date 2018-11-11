import { combineEpics, ofType } from 'redux-observable';
import { concatMap } from 'rxjs/operators';

import { MapTile } from 'types';
import { mapSize } from 'constants/map';
import { of } from 'rxjs';

type SpawnEnemiesAction = { type: 'SPAWN_ENEMIES' };

export type EnemiesAction = SpawnEnemiesAction;

export type EnemiesState = {
  enemies: MapTile[][],
};

/* type State = {
  enemies: EnemiesState,
}; */

export class EnemiesModule {
  public static actions = {
    spawn: (): SpawnEnemiesAction => ({ type: 'SPAWN_ENEMIES' }),
  };

  public static selectors = {
    // TODO: do some reselect stuff here to not recreate the array all the time.
    // map: (state: State): Matrix => Matrix.fromTwoDimensionalArray(state.map.map),
  };

  public static reducer(state: EnemiesState = EnemiesModule.initialState, action: EnemiesAction): EnemiesState {
    switch (action.type) {
      default:
        return state;
    }
  }

  private static initialState: EnemiesState = {
    enemies: Array(mapSize.y).fill(0).map(() => Array(mapSize.x).fill('solid-stone')),
  };
}

const spawnEnemiesEpic = (action$: any) => action$.pipe( // TODO: better type.
  ofType('SPAWN_ENEMIES'),
  concatMap(() => of(
    { type: 'SPAWN_ENEMIES_FINISHED' },
  )),
);

export const enemiesEpics = combineEpics(
  spawnEnemiesEpic,
);
