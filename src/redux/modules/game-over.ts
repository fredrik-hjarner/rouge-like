import { delay } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { PlayerActionTypes } from './player';
import { MessagesModule } from './messages';

export function* gameOverSaga() {
  while (true) {
    yield take(PlayerActionTypes.PLAYER_KILL_PLAYER);
    yield put(MessagesModule.actions.addMessage(`You take one blow too much.`));
    yield call(delay, 1500);
    yield put(MessagesModule.actions.addMessage(`You die a slow and painful death.`));
    yield call(delay, 2000);
    yield put(MessagesModule.actions.addMessage(`Rest in peace.`));
  }
}
