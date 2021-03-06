import { put, take } from 'redux-saga/effects';

import { EnemiesModule } from './enemies';
import { GameLoopModule } from './game-loop';

export type InitializeAction = { type: 'INITIALIZE' };

export class InitializeModule {
  public static actions = {
    initialize: (): InitializeAction => ({ type: 'INITIALIZE' }),
  };
}

// TODO: use action creators and constants.
export function* initializeSaga() {
  while (true) {
    yield take('INITIALIZE');
    yield put({ type: 'GEN_MAP' });

    yield take('GEN_MAP_FINISHED');
    yield put({ type: 'SPAWN_PLAYER' });

    yield take('SPAWN_PLAYER_FINISHED');
    yield put(EnemiesModule.actions.spawn());

    yield take('SPAWN_ENEMIES_FINISHED');
    yield put({ type: 'INITIALIZE_FINISHED' });

    yield put(GameLoopModule.actions.tick());
  }
}
