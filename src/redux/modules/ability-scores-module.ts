export type AbilityScoreAction = { type: 'update-ability-scores', payload: AbilityScoreState };

export type AbilityScoreState = {
  charisma: number,
  constitution: number,
  dexterity: number,
  intelligence: number,
  strength: number,
  wisdom: number,
};

export class AbilityScoreModule {
  public static initialState: AbilityScoreState = {
    charisma: 0,
    constitution: 0,
    dexterity: 0,
    intelligence: 0,
    strength: 0,
    wisdom: 0,
  };

  public static reducer(state: AbilityScoreState = AbilityScoreModule.initialState, action: AbilityScoreAction): AbilityScoreState {
    switch (action.type) {
      case 'update-ability-scores':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  }

  public static updateAbilityScores(abilityScores: AbilityScoreState): AbilityScoreAction {
    return { type: 'update-ability-scores', payload: abilityScores };
  }
}
