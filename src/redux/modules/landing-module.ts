export type LandingAction = {type: 'fetch-character'} | {type: 'update-character', payload: {name: string}};
export type LandingState = {
  character: string;
};

export class LandingModule {
  public static initialState: LandingState = {
    character: '',
  };

  public static reducer(state: LandingState = LandingModule.initialState, action: LandingAction): LandingState {
    switch (action.type) {
      case 'fetch-character': {
        return {
          ...state,
          character: 'Nils',
        };
      }
      case 'update-character':
        return {
          ...state,
          character: action.payload.name,
        };
      default:
        return state;
    }
  }

  public static fetchCharacter(): LandingAction {
    return {type: 'fetch-character'};
  }

  public static updateCharacter(name: string): LandingAction {
    return {type: 'update-character', payload: {name}};
  }
}
