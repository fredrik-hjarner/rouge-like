import * as uuid from 'uuid/v4';
import { random } from 'lodash';
import { put, take, all, select } from 'redux-saga/effects';

import spawnEnemies from 'enemies/spawn-enemies';
import { mapSize } from 'constants/map';
import { Matrix } from 'utils';
import { Direction } from 'types';

type SpawnEnemiesAction = { type: 'SPAWN_ENEMIES' };
type SetEnemiesAction = { type: 'SET_ENEMIES', payload: { enemies: any } }; // TODO: better type

export type EnemiesAction = SpawnEnemiesAction | SetEnemiesAction;

export type EnemiesState = {
  enemies: any, // TODO: better type
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
    enemyById: (state: State) => (id: number) => state.enemies.enemies[id],
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

// TODO: use action creators and constants.
function* runEnemyAISaga() {
  while (true) {
    const action = yield take('RUN_ENEMY_AI');
    const { id } = action.payload;
    const r = random(1, 4);
    let direction: Direction;
    switch (r) {
      case 1: direction = 'EAST'; break;
      case 2: direction = 'NORTH'; break;
      case 3: direction = 'SOUTH'; break;
      case 4:
      default: direction = 'WEST'; break;
    }
    yield put({ type: 'ENEMY:MOVE', payload: { id, direction } });
  }
}

// TODO: use action creators and constants.
function* spawnEnemiesSaga() {
  while (true) {
    yield take('SPAWN_ENEMIES');
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
    yield put(EnemiesModule.actions.setEnemies(enemies));
    yield put({ type: 'SPAWN_ENEMIES_FINISHED' });
  }
}

function* runAllEnemyAISaga() {
  while (true) {
    yield take('RUN_ALL_ENEMY_AI');
    const enemiesArray = yield select(EnemiesModule.selectors.enemiesAsArray);
    const actions = enemiesArray.map((enemy: any) => ({ type: 'RUN_ENEMY_AI', payload: { id: enemy.id } }));
    for (let i = 0; i < actions.length; i++) { // tslint:disable-line
      yield put(actions[i]);
    }
    yield put({ type: 'RUN_ALL_ENEMY_AI_FINISHED' });
  }
}

export function* enemiesSaga() {
  yield all([
    spawnEnemiesSaga(),
    runAllEnemyAISaga(),
    runEnemyAISaga(),
  ]);
}
