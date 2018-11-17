import * as uuid from 'uuid/v4';

import { Pos, ItemType, Item } from 'types';

export class ItemsActionTypes {
  public static readonly ITEM_SPAWN = 'ITEMS:SPAWN';
}

type SpawnItemAction = { type: 'ITEMS:SPAWN', payload: { type: ItemType, pos: Pos } };

export type ItemsAction = SpawnItemAction;

export type ItemsState = {
  items: any, // TODO: better type
};

type State = {
  items: ItemsState,
};

export class ItemsModule {
  public static actions = {
    spawn: (type: ItemType, pos: Pos): SpawnItemAction =>
      ({ type: ItemsActionTypes.ITEM_SPAWN, payload: { type, pos } }),
  };

  public static selectors = {
    isItemAtPos: ({ x, y }: Pos) => (state: State): Item | undefined => {
      const array: Item[] = Object.values(state.items.items);
      const item: Item | undefined = array.find(({ pos }: Item) => pos.x === x && pos.y === y);
      return item ? item : undefined;
    },
  };

  public static reducer(state: ItemsState = ItemsModule.initialState, action: ItemsAction): ItemsState {
    switch (action.type) {
      case ItemsActionTypes.ITEM_SPAWN: {
        const { pos, type } = action.payload;
        return {
          ...state,
          items: {
            ...state.items,
            [uuid()]: { pos, type },
          },
        };
      }
      default:
        return state;
    }
  }

  private static initialState: ItemsState = {
    items: {},
  };
}
