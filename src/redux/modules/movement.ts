export type AbilityScoreAction = { type: 'set-position', payload: AbilityScoreState };

export type AbilityScoreState = {
  x: number, y: number,
};

export class AbilityScoreModule {
  public static initialState: AbilityScoreState = {
    x: 3,
    y: 2,
  };

  public static reducer(state: AbilityScoreState = AbilityScoreModule.initialState, action: AbilityScoreAction): AbilityScoreState {
    switch (action.type) {
      case 'set-position':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  }

  public static setPosition(abilityScores: AbilityScoreState): AbilityScoreAction {
    return { type: 'set-position', payload: abilityScores };
  }

  public static getPosition(state: any): {x: number, y: number} {
    return state.abilityScores;
  }
}
