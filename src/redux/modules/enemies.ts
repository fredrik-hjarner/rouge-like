import * as uuid from 'uuid/v4';
import { put, take, all, select } from 'redux-saga/effects';
import { dissocPath } from 'ramda';

import spawnEnemies from 'enemies/spawn-enemies';
import { mapSize } from 'constants/map';
import { Matrix, applyDirectionToPos, isPosInsideOfMap, directionFromTo, isSamePos } from 'utils';
import { Pos, Enemy } from 'types';
import { isWalkable } from 'legal-move';
import { MapModule } from './map';
import { ItemsModule } from './items';
import { MessagesModule } from './messages';
import { PlayerModule } from './player';

export class EnemiesActionTypes {
  public static readonly ENEMIES_MOVE_ENEMY = 'ENEMIES:MOVE_ENEMY';
  public static readonly ENEMIES_SET_ENEMY_POS = 'ENEMIES:SET_ENEMY_POS';
  public static readonly ENEMIES_SET_ENEMIES = 'ENEMIES:SET_ENEMIES';
  public static readonly ENEMIES_SPAWN = 'ENEMIES:SPAWN';
  public static readonly ENEMIES_INITIATE_DAMAGE_ENEMY = 'ENEMIES:INITIATE_DAMAGE_ENEMY';
  public static readonly ENEMIES_DAMAGE_ENEMY = 'ENEMIES:DAMAGE_ENEMY';
  public static readonly ENEMIES_KILL_ENEMY = 'ENEMIES:KILL_ENEMY';
}

type MoveEnemyAction = { type: 'ENEMIES:MOVE_ENEMY', payload: { id: string } };
type SetEnemyPosAction = { type: 'ENEMIES:SET_ENEMY_POS', payload: { id: string, pos: Pos } };
type SpawnEnemiesAction = { type: 'ENEMIES:SPAWN' };
type SetEnemiesAction = { type: 'ENEMIES:SET_ENEMIES', payload: { enemies: any } }; // TODO: better type
type DamageEnemyAction = { type: 'ENEMIES:DAMAGE_ENEMY', payload: { id: string } };
type InitiateDamageEnemyAction = { type: 'ENEMIES:INITIATE_DAMAGE_ENEMY', payload: { id: string } };
type KillEnemyAction = { type: 'ENEMIES:KILL_ENEMY', payload: { id: string } };

export type EnemiesAction =
  MoveEnemyAction |
  SetEnemyPosAction |
  SpawnEnemiesAction |
  SetEnemiesAction |
  DamageEnemyAction |
  InitiateDamageEnemyAction |
  KillEnemyAction;

export type EnemiesState = {
  enemies: any, // TODO: better type
};

type State = {
  enemies: EnemiesState,
};

export class EnemiesModule {
  public static actions = {
    damageEnemy: (id: string): DamageEnemyAction =>
      ({ type: 'ENEMIES:DAMAGE_ENEMY', payload: { id } }),
    initiateDamageEnemy: (id: string): InitiateDamageEnemyAction =>
      ({ type: 'ENEMIES:INITIATE_DAMAGE_ENEMY', payload: { id } }),
    killEnemy: (id: string): KillEnemyAction => ({ type: EnemiesActionTypes.ENEMIES_KILL_ENEMY, payload: { id } }),
    moveEnemy: (id: string): MoveEnemyAction => ({ type: EnemiesActionTypes.ENEMIES_MOVE_ENEMY, payload: { id } }),
    // TODO: better type
    setEnemies: (enemies: any) => ({ type: EnemiesActionTypes.ENEMIES_SET_ENEMIES, payload: { enemies } }),
    setEnemyPos: (id: string, pos: Pos): SetEnemyPosAction =>
      ({ type: EnemiesActionTypes.ENEMIES_SET_ENEMY_POS, payload: { id, pos } }),
    spawn: (): SpawnEnemiesAction => ({ type: EnemiesActionTypes.ENEMIES_SPAWN }),
  };

  public static selectors = {
    // TODO: do some reselect stuff here to not recreate the array all the time.
    enemiesAsArray: (state: State): Enemy[] => Object.values(state.enemies.enemies),
    enemiesAsMatrix: (state: State) => {
      const enemies = Object.values(state.enemies.enemies);
      const matrix = Matrix.create(mapSize.x, mapSize.y, null);
      // TODO: better type.
      enemies.forEach((enemy: any) => matrix.set(enemy.pos.x, enemy.pos.y, enemy));
      return matrix;
    },
    enemyById: (id: number) => (state: State) => state.enemies.enemies[id],
    isEnemyAtPos: ({ x, y }: Pos) => (state: State): Enemy | undefined => {
      const enemyArray: Enemy[] = Object.values(state.enemies.enemies);
      const enemyAtPos: Enemy | undefined = enemyArray.find(({ pos }: Enemy) => pos.x === x && pos.y === y);
      return enemyAtPos ? enemyAtPos : undefined;
    },
  };

  public static reducer(state: EnemiesState = EnemiesModule.initialState, action: EnemiesAction): EnemiesState {
    switch (action.type) {
      case EnemiesActionTypes.ENEMIES_KILL_ENEMY: {
        const { id } = action.payload;
        return dissocPath(['enemies', id], state);
      }
      case EnemiesActionTypes.ENEMIES_DAMAGE_ENEMY: {
        const { id } = action.payload;
        return {
          ...state,
          enemies: {
            ...state.enemies,
            [id]: {
              ...state.enemies[id],
              hp: state.enemies[id].hp - 1,
            },
          },
        };
      }
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
    // TODO: corpses should probably not even get inte this saga!!
    if (enemy.hp !== 0) {
      // const pos = applyDirectionToPos(enemy.pos, randomDirection());
      const playerPos = yield select(PlayerModule.selectors.position);
      const dirToPlayer = directionFromTo(enemy.pos, playerPos);
      const pos = applyDirectionToPos(enemy.pos, dirToPlayer);
      const map = yield select(MapModule.selectors.map);
      const isValidMove = isPosInsideOfMap(pos) && isWalkable(map, pos);
      if (isValidMove) {
        if (isSamePos(pos, playerPos)) {
          yield put(PlayerModule.actions.initDamagePlayer());
        } else {
          yield put(EnemiesModule.actions.setEnemyPos(id, pos));
        }
      }
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
      ({ type: 'ENEMY:RUN_AI', payload: { id: enemy.id } }),
    );
    for (let i = 0; i < actions.length; i++) { // tslint:disable-line
      yield put(actions[i]);
    }
    yield put({ type: 'ENEMIES:RUN_AI_FINISHED' });
  }
}

function* damageEnemySaga() {
  while (true) {
    const { payload: { id } } = yield take('ENEMIES:INITIATE_DAMAGE_ENEMY');
    const enemy = yield select(EnemiesModule.selectors.enemyById(id));
    yield put(MessagesModule.actions.addMessage(`You hit ${enemy.type}!`));
    if (enemy.hp <= 1) {
      yield put(EnemiesModule.actions.killEnemy(id));
      yield put(ItemsModule.actions.spawn('GOBLIN_CORPSE', enemy.pos));
    } else {
      yield put(EnemiesModule.actions.damageEnemy(id));
    }
  }
}

export function* enemiesSaga() {
  yield all([
    moveEnemySaga(),
    spawnEnemiesSaga(),
    runAllEnemyAISaga(),
    runEnemyAISaga(),
    damageEnemySaga(),
  ]);
}
