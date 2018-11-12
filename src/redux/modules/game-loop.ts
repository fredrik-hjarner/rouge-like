import { put, take } from 'redux-saga/effects';

/**
 * TODO: Keep track of ticks/turns n shit.
 */

export const gameLoopSaga = function*() {
  while (true) {
    yield take('PLAYER:MOVE-FINISHED');
    yield put({ type: 'ENEMIES:RUN_AI'});
  }
};
