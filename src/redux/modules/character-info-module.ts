export type CharacterInfoAction = { type: 'update-character-info', payload: CharacterInfoState };

export type CharacterInfoState = {
  alignment: string,
  background: string,
  characterName: string,
  class: string,
  experience: number,
  level: number,
  playerName: string,
  race: string,
};

export class CharacterInfoModule {
  public static initialState: CharacterInfoState = {
    alignment: '',
    background: '',
    characterName: '',
    class: '',
    experience: 0,
    level: 1,
    playerName: '',
    race: '',
  };

  public static reducer(state: CharacterInfoState = CharacterInfoModule.initialState, action: CharacterInfoAction): CharacterInfoState {
    switch (action.type) {
      case 'update-character-info':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  }

  public static updateCharacterInfo(characterInfo: CharacterInfoState): CharacterInfoAction {
    return { type: 'update-character-info', payload: characterInfo };
  }
}
