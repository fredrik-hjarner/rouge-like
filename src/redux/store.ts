import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import {
  EnemiesModule, EnemiesState, enemiesSaga,
  initializeSaga,
  GameLoopModule, GameLoopState, gameLoopSaga,
  MapModule, MapState, mapSaga,
  PlayerModule, PlayerState, playerSaga,
} from './modules';

export interface State {
  enemies: EnemiesState;
  gameLoop: GameLoopState;
  map: MapState;
  player: PlayerState;
}

let composeEnhancers = compose;

if (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
  // maxAge sets the number actions Redux DevTools should store. default 50.
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 });
}

const rootReducer = combineReducers({
  enemies: EnemiesModule.reducer,
  gameLoop: GameLoopModule.reducer,
  map: MapModule.reducer,
  player: PlayerModule.reducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    enemiesSaga(),
    initializeSaga(),
    mapSaga(),
    playerSaga(),
    gameLoopSaga(),
  ]);
}

const reducer = rootReducer;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
