import { Palettes } from '../types';

// Actions
interface SetPalettesAction {
  payload: Palettes;
  type: 'SET_PALETTES';
}

export const setPalettes = (palettes: Palettes): SetPalettesAction => ({
  payload: palettes,
  type: 'SET_PALETTES'
});

interface ResetPalettesAction {
  payload: Palettes;
  type: 'RESET_PALETTES';
}

export const resetPalettes = (): ResetPalettesAction => ({
  payload: {} as Palettes,
  type: 'RESET_PALETTES'
});

type ActionTypes = SetPalettesAction | ResetPalettesAction;

// Reducer
export interface PalettesState {
  palettes: Palettes | undefined;
}

const initialState: PalettesState = {
  palettes: undefined
};

export const reducer = (
  state: PalettesState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'SET_PALETTES':
      return {
        ...state,
        palettes: action.payload
      };
    case 'RESET_PALETTES':
      return {
        ...state,
        palettes: action.payload
      };
    default:
      return state;
  }
};