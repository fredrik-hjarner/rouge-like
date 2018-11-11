import { combineEpics, ofType } from 'redux-observable';
import { concatMap } from 'rxjs/operators';
import * as uuid from 'uuid/v4';

import spawnEnemies from 'enemies/spawn-enemies';
import { of } from 'rxjs';
import { mapSize } from 'constants/map';
import { Matrix } from 'utils';

type SpawnEnemiesAction = { type: 'SPAWN_ENEMIES' };
type SetEnemiesAction = { type: 'SET_ENEMIES', payload: { enemies: any } }; // TODO: better type

export type EnemiesAction = SpawnEnemiesAction | SetEnemiesAction;

export type EnemiesState = {
  enemies: {}, // TODO: better type
};

type State = {
  enemies: EnemiesState,
};

export class EnemiesModule {
  public static actions = {
    // TODO: better type
    setEnemies: (enemies: any) => ({ type: 'SET_ENEMIES', payload: { enemies } }),
    spawn: (): SpawnEnemiesAction => ({ type: 'SPAWN_ENEMIES' }),
  };

  public static selectors = {
    // TODO: do some reselect stuff here to not recreate the array all the time.
    enemiesAsArray: (state: State) => Object.values(state.enemies.enemies),
    enemiesAsMatrix: (state: State) => {
      const enemies = Object.values(state.enemies.enemies);
      const matrix = Matrix.create(mapSize.x, mapSize.y, null);
      // TODO: better type.
      enemies.forEach((enemy: any) => matrix.set(enemy.pos.x, enemy.pos.y, enemy));
      return matrix;
    },
  };

  public static reducer(state: EnemiesState = EnemiesModule.initialState, action: EnemiesAction): EnemiesState {
    switch (action.type) {
      case 'SET_ENEMIES':
        return {
          ...state,
          enemies: action.payload.enemies,
        };
      default:
        return state;
    }
  }

  private static initialState: EnemiesState = {
    enemies: {},
  };
}

const spawnEnemiesEpic = (action$: any) => action$.pipe( // TODO: better type.
  ofType('SPAWN_ENEMIES'),
  concatMap(() => {
    const enemies = spawnEnemies().reduce(
      (acc, enemy) => {
        const id = uuid();
        return {
          ...acc,
          [id]: { ...enemy, id },
        };
      },
      {},
    );
    return of(
      EnemiesModule.actions.setEnemies(enemies),
      { type: 'SPAWN_ENEMIES_FINISHED' },
    );
  }),
);

export const enemiesEpics = combineEpics(
  spawnEnemiesEpic,
);
