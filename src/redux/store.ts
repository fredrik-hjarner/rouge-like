import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import {
  initializeEpics,
  PlayerModule, PlayerState, playerEpics,
} from './modules';

export interface State {
  player: PlayerState;
}

let composeEnhancers = compose;

if (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
  // maxAge sets the number actions Redux DevTools should store. default 50.
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 });
}

const rootReducer = combineReducers({
  player: PlayerModule.reducer,
});

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
  initializeEpics,
  playerEpics,
);

const reducer = rootReducer;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic);

export default store;
