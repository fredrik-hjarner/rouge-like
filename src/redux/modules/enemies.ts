import * as uuid from 'uuid/v4';
import { put, take, all, select } from 'redux-saga/effects';

import spawnEnemies from 'enemies/spawn-enemies';
import { mapSize } from 'constants/map';
import { Matrix, randomDirection, applyDirectionToPos } from 'utils';
import { Pos } from 'types';
import { isWalkable } from 'legal-move';
import { MapModule } from './map';

export class EnemiesActionTypes {
  public static readonly ENEMIES_MOVE_ENEMY = 'ENEMIES:MOVE_ENEMY';
  public static readonly ENEMIES_SET_ENEMY_POS = 'ENEMIES:SET_ENEMY_POS';
  public static readonly ENEMIES_SET_ENEMIES = 'ENEMIES:SET_ENEMIES';
  public static readonly ENEMIES_SPAWN = 'ENEMIES:SPAWN';
}

type MoveEnemyAction = { type: 'ENEMIES:MOVE_ENEMY', payload: { id: string } };
type SetEnemyPosAction = { type: 'ENEMIES:SET_ENEMY_POS', payload: { id: string, pos: Pos } };
type SpawnEnemiesAction = { type: 'ENEMIES:SPAWN' };
type SetEnemiesAction = { type: 'ENEMIES:SET_ENEMIES', payload: { enemies: any } }; // TODO: better type

export type EnemiesAction = MoveEnemyAction | SetEnemyPosAction | SpawnEnemiesAction | SetEnemiesAction;

export type EnemiesState = {
  enemies: any, // TODO: better type
};

type State = {
  enemies: EnemiesState,
};

/* type Enemy = {
  type: string,
  pos: Pos,
}; */

export class EnemiesModule {
  public static actions = {
    // TODO: better type
    moveEnemy: (id: string): MoveEnemyAction => ({ type: EnemiesActionTypes.ENEMIES_MOVE_ENEMY, payload: { id } }),
    setEnemies: (enemies: any) => ({ type: EnemiesActionTypes.ENEMIES_SET_ENEMIES, payload: { enemies } }),
    setEnemyPos: (id: string, pos: Pos): SetEnemyPosAction =>
      ({ type: EnemiesActionTypes.ENEMIES_SET_ENEMY_POS, payload: { id, pos } }),
    spawn: (): SpawnEnemiesAction => ({ type: EnemiesActionTypes.ENEMIES_SPAWN }),
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
    // TODO: I have to think about how to improve enemyById.
    enemyById: (id: number) => (state: State) => state.enemies.enemies[id],
  };

  public static reducer(state: EnemiesState = EnemiesModule.initialState, action: EnemiesAction): EnemiesState {
    switch (action.type) {
      case EnemiesActionTypes.ENEMIES_SET_ENEMY_POS: {
        const { id, pos } = action.payload;
        return {
          ...state,
          enemies: {
            ...state.enemies,
            [id]: {
              ...state.enemies[id],
              pos,
            },
          },
        };
      }
      case EnemiesActionTypes.ENEMIES_SET_ENEMIES:
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

function* moveEnemySaga() {
  while (true) {
    const action = yield take(EnemiesActionTypes.ENEMIES_MOVE_ENEMY);
    const { id } = action.payload;
    const enemy = yield select(EnemiesModule.selectors.enemyById(id));
    const pos = applyDirectionToPos(enemy.pos, randomDirection());
    const map = yield select(MapModule.selectors.map);
    const isValidMove = isWalkable(map, pos);
    if (isValidMove) {
      yield put(EnemiesModule.actions.setEnemyPos(id, pos));
    }
  }
}

// TODO: use action creators and constants.
function* runEnemyAISaga() {
  while (true) {
    const action = yield take('ENEMY:RUN_AI');
    const { id } = action.payload;
    yield put(EnemiesModule.actions.moveEnemy(id));
  }
}

// TODO: use action creators and constants.
function* spawnEnemiesSaga() {
  while (true) {
    yield take(EnemiesActionTypes.ENEMIES_SPAWN);
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
    yield take('ENEMIES:RUN_AI');
    const enemiesArray = yield select(EnemiesModule.selectors.enemiesAsArray);
    const actions = enemiesArray.map((enemy: any) =>
      // EnemiesModule.actions.moveEnemy(enemy.id, randomDirection(),
      ({ type: 'ENEMY:RUN_AI', payload: { id: enemy.id } }),
    );
    for (let i = 0; i < actions.length; i++) { // tslint:disable-line
      yield put(actions[i]);
    }
    yield put({ type: 'ENEMIES:RUN_AI_FINISHED' });
  }
}

export function* enemiesSaga() {
  yield all([
    moveEnemySaga(),
    spawnEnemiesSaga(),
    runAllEnemyAISaga(),
    runEnemyAISaga(),
  ]);
}
