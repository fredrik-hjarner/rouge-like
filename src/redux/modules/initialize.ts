import { combineEpics, ofType } from 'redux-observable';
import { mapTo } from 'rxjs/operators';

export type InitializeAction = { type: 'INITIALIZE' };

export class InitializeModule {
  public static actions = {
    initialize: (): InitializeAction => ({ type: 'INITIALIZE' }),
  };
}

export const initializeEpics = combineEpics(
  (action$: any) => action$.pipe(
    ofType('INITIALIZE'),
    mapTo({ type: 'GEN_MAP' }),
  ),
  (action$: any) => action$.pipe(
    ofType('GEN_MAP_FINISHED'),
    mapTo({ type: 'SPAWN_ENEMIES' }),
  ),
  (action$: any) => action$.pipe(
    ofType('SPAWN_ENEMIES_FINISHED'),
    mapTo({ type: 'SPAWN_PLAYER' }),
  ),
);
