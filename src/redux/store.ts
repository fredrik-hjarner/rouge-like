import { createStore, combineReducers, Store } from 'redux';

import {
  AbilityScoreModule, AbilityScoreState,
} from './modules';

export interface State {
  abilityScores: AbilityScoreState;
}

export class StoreManager {
  public static createStore(): Store<State, any> {
    let middleware;

    if (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      // maxAge sets the number actions Redux DevTools should store. default 50.
      middleware = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 })();
    }

    const rootReducer = combineReducers({
      abilityScores: AbilityScoreModule.reducer,
    });

    const reducer = rootReducer;
    return createStore(reducer, middleware);
  }
}
