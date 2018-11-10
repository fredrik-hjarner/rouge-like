import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

import {
  AbilityScoreModule, AbilityScoreState,
} from './modules';

export interface State {
  abilityScores: AbilityScoreState;
}

// TODO: remove
const pingEpic = (action$: any) => action$.pipe(
  ofType('PING'),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: 'PONG' }),
);

let composeEnhancers = compose;

if (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
  // maxAge sets the number actions Redux DevTools should store. default 50.
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 });
}

const rootReducer = combineReducers({
  abilityScores: AbilityScoreModule.reducer,
});

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
  pingEpic,
);

const reducer = rootReducer;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(rootEpic);

export default store;
