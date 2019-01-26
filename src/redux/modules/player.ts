import { put, take, all, select } from 'redux-saga/effects';

import { MapModule } from 'redux/modules';
import { Pos, Direction } from 'types';
import { isWalkable } from 'legal-move';
import spawnPlayer from 'player/spawn-player';
import { applyDirectionToPos } from 'utils';
import { EnemiesModule } from './enemies';

// TODO: complete this.
export class PlayerActionTypes {
  public static readonly PLAYER_KILL_PLAYER = 'PLAYER:KILL_PLAYER';
}

type SpawnPlayer = { type: 'SPAWN_PLAYER' };
type MoveAction = { type: 'MOVE', payload: { direction: Direction } };
type SetPosAction = { type: 'SET_POS', payload: { pos: Pos } };
type DamagePlayerAction = { type: 'PLAYER:DAMAGE_PLAYER' };
type InitDamagePlayerAction = { type: 'PLAYER:INIT_DAMAGE_PLAYER' };
type KillPlayerAction = { type: 'PLAYER:KILL_PLAYER' };

export type PlayerAction =
  SpawnPlayer |
  MoveAction |
  SetPosAction |
  DamagePlayerAction |
  KillPlayerAction |
  InitDamagePlayerAction;

export type PlayerState = {
  x: number,
  y: number,
  hp: number,
};

type State = {
  player: PlayerState,
};

export class PlayerModule {
  public static actions = {
    damagePlayer: (): DamagePlayerAction => ({ type: 'PLAYER:DAMAGE_PLAYER' }),
    initDamagePlayer: (): InitDamagePlayerAction => ({ type: 'PLAYER:INIT_DAMAGE_PLAYER' }),
    killPlayer: (): KillPlayerAction => ({ type: 'PLAYER:KILL_PLAYER' }),
    move: (direction: Direction): PlayerAction => ({ type: 'MOVE', payload: { direction } }),
    setPos: (pos: Pos): PlayerAction => ({ type: 'SET_POS', payload: { pos } }),
    spawn: (): PlayerAction => ({ type: 'SPAWN_PLAYER' }),
  };

  public static selectors = {
    hp: ({ player }: State): number => player.hp,
    position: (state: State): Pos => ({
      x: state.player.x,
      y: state.player.y,
    }),
  };

  public static reducer(
    state: PlayerState = PlayerModule.initialState,
    action: PlayerAction,
  ): PlayerState {
    switch (action.type) {
      case 'SET_POS': {
        const { x, y } = action.payload.pos;
        return { ...state, x, y };
      }
      case 'PLAYER:DAMAGE_PLAYER': {
        return { ...state, hp: state.hp - 1 };
      }
      case 'PLAYER:KILL_PLAYER': {
        return { ...state, hp: 0 };
      }
      default:
        return state;
    }
  }

  private static initialState: PlayerState = {
    hp: 10,
    x: 10,
    y: 10,
  };
}

function* moveSaga() {
  while (true) {
    const action = yield take('MOVE');
    const { x, y } = yield select(PlayerModule.selectors.position);
    // Check if the move is valid.
    const moveTo = applyDirectionToPos({x, y}, action.payload.direction);
    const enemy = yield select(EnemiesModule.selectors.isEnemyAtPos(moveTo));
    if (enemy) {
      /* const xp = */ yield put(EnemiesModule.actions.initiateDamageEnemy(enemy.id));
    } else {
      const map = yield select(MapModule.selectors.map);
      if (isWalkable(map, moveTo)) {
        yield put(PlayerModule.actions.setPos(moveTo));
      }
    }
    yield put({ type: 'ILLEGAL_MOVE' });
    yield put({ type: 'PLAYER:MOVE-FINISHED' });
  }
}

// TODO: use action creators and constants.
function* spawnSaga() {
  while (true) {
    yield take('SPAWN_PLAYER');
    const playerPos = spawnPlayer();
    yield put(PlayerModule.actions.setPos(playerPos));
    yield put({ type: 'SPAWN_PLAYER_FINISHED' });
  }
}

function* initDamagePlayerSaga() {
  while (true) {
    yield take('PLAYER:INIT_DAMAGE_PLAYER');
    const hp = yield select(PlayerModule.selectors.hp);
    if (hp <= 1) {
      yield put(PlayerModule.actions.killPlayer());
    } else {
      yield put(PlayerModule.actions.damagePlayer());
    }
  }
}

export function* playerSaga() {
  yield all([
    spawnSaga(),
    moveSaga(),
    initDamagePlayerSaga(),
  ]);
}
