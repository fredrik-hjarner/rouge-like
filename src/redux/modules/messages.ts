export class MessagesActionTypes {
  public static readonly ADD_MESSAGE = 'MESSAGES:ADD';
}

type AddMessageAction = { type: 'MESSAGES:ADD', payload: { message: string } };

export type MessagesAction = AddMessageAction;

export type MessagesState = {
  messages: string[],
};

type State = {
  messages: MessagesState,
};

export class MessagesModule {
  public static actions = {
    addMessage: (message: string): AddMessageAction =>
      ({ type: MessagesActionTypes.ADD_MESSAGE, payload: { message } }),
  };

  public static selectors = {
    messages: (state: State): string[] => state.messages.messages,
  };

  public static reducer(state: MessagesState = MessagesModule.initialState, action: MessagesAction): MessagesState {
    switch (action.type) {
      case MessagesActionTypes.ADD_MESSAGE: {
        const { message } = action.payload;
        return {
          ...state,
          messages: state.messages.concat(message),
        };
      }
      default:
        return state;
    }
  }

  private static initialState: MessagesState = {
    messages: [],
  };
}
