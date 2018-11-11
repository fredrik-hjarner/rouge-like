import { combineEpics, ofType } from 'redux-observable';
import { empty } from 'rxjs';
import { tap, delay, concatMap } from 'rxjs/operators';

export type InitializeAction = { type: 'INITIALIZE' };

export class InitializeModule {
  public static actions = {
    initialize: (): InitializeAction => ({ type: 'INITIALIZE' }),
  };
}

const initEpic = (action$: any/* , state$: any */) => action$.pipe( // TODO: better type.
  ofType('INITIALIZE'),
  tap(() => console.log('3')),
  delay(2000),
  tap(() => console.log('2')),
  delay(2000),
  tap(() => console.log('1')),
  concatMap(() => empty()),
);

export const initializeEpics = combineEpics(
  initEpic,
);
