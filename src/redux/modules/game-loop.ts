import { put, take } from 'redux-saga/effects';

export class GameLoopActionTypes {
  public static readonly TICK = 'GAME_LOOP:TICK';
}

type TickAction = { type: 'GAME_LOOP:TICK' };

export type GameLoopAction = TickAction;

export type GameLoopState = {
  tick: number,
};

type State = {
  gameLoop: GameLoopState,
};

export class GameLoopModule {
  public static actions = {
    tick: (): GameLoopAction => ({ type: GameLoopActionTypes.TICK }),
  };

  public static selectors = {
    tick: (state: State) => state.gameLoop.tick,
  };

  public static reducer(state: GameLoopState = GameLoopModule.initialState, action: GameLoopAction): GameLoopState {
    switch (action.type) {
      case GameLoopActionTypes.TICK:
        return {
          ...state,
          tick: state.tick + 1,
        };
      default:
        return state;
    }
  }

  private static initialState: GameLoopState = {
    tick: 0,
  };
}

export const gameLoopSaga = function*() {
  while (true) {
    yield take('PLAYER:MOVE-FINISHED');
    yield put({ type: 'ENEMIES:RUN_AI'});

    yield take('ENEMIES:RUN_AI_FINISHED');
    yield put(GameLoopModule.actions.tick());
  }
};
