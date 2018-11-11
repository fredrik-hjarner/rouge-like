import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import {
  initializeEpics,
  MapModule, MapState, mapEpics,
  PlayerModule, PlayerState, playerEpics,
} from './modules';

export interface State {
  map: MapState;
  player: PlayerState;
}

let composeEnhancers = compose;

if (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
  // maxAge sets the number actions Redux DevTools should store. default 50.
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 });
}

const rootReducer = combineReducers({
  map: MapModule.reducer,
  player: PlayerModule.reducer,
});

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
  initializeEpics,
  mapEpics,
  playerEpics,
);

const reducer = rootReducer;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic);

export default store;
