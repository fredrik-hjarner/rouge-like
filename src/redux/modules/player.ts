import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Pos, Direction } from 'types';
import { legalMove } from 'legal-move';

type MoveAction = { type: 'MOVE', payload: { direction: Direction } };
type SetPosAction = { type: 'SET_POS', payload: { pos: Pos } };

export type PlayerAction = MoveAction | SetPosAction;

export type PlayerState = {
  x: number, y: number,
};

type State = {
  player: PlayerState,
};

export class PlayerModule {
  public static actions = {
    move: (direction: Direction): PlayerAction => ({ type: 'MOVE', payload: { direction } }),
    setPos: (pos: Pos): PlayerAction => ({ type: 'SET_POS', payload: { pos } }),
  };

  public static selectors = {
    position: (state: State): Pos => ({
      x: state.player.x,
      y: state.player.y,
    }),
  };

  public static reducer(state: PlayerState = PlayerModule.initialState, action: PlayerAction): PlayerState {
    switch (action.type) {
      case 'SET_POS': {
        const { x, y } = action.payload.pos;
        return { x, y };
      }
      default:
        return state;
    }
  }

  private static initialState: PlayerState = {
    x: 10,
    y: 10,
  };
}

const moveEpic = (action$: any, state$: any) => action$.pipe( // TODO: better type.
  ofType('MOVE'),
  concatMap((action: MoveAction) => {
    const { x, y } = PlayerModule.selectors.position(state$.value);
    // Check if the move is valid.
    let moveTo: Pos;
    switch (action.payload.direction) {
      case 'EAST': moveTo = { x: x + 1, y }; break;
      case 'NORTH': moveTo = { x, y: y - 1 }; break;
      case 'SOUTH': moveTo = { x, y: y + 1 }; break;
      case 'WEST':
      default: moveTo = { x: x - 1, y }; break;
    }
    if (legalMove(moveTo)) {
      return of(PlayerModule.actions.setPos(moveTo));
    }
    return of({ type: 'ILLEGAL_MOVE' });
  }),
);

export const playerEpics = combineEpics(
  moveEpic,
);
