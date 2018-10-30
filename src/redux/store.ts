import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, combineReducers, Store } from 'redux';

import { history } from 'redux/history';
import {
  LandingModule, LandingState,
  AbilityScoreModule, AbilityScoreState,
  CharacterInfoModule, CharacterInfoState,
} from './modules';

export interface State {
  abilityScores: AbilityScoreState;
  characterInfo: CharacterInfoState;
  landing: LandingState;
}

export class StoreManager {
  public static createStore(): Store<State, any> {
    let composeEnhancers = compose;

    if (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      // maxAge sets the number actions Redux DevTools should store. default 50.
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 });
    }

    const rootReducer = combineReducers({
      abilityScores: AbilityScoreModule.reducer,
      characterInfo: CharacterInfoModule.reducer,
      landing: LandingModule.reducer,
    });

    const reducer = connectRouter(history)(rootReducer);
    const middleware = composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
      ),
    );
    return createStore(reducer, {}, middleware);
  }
}
