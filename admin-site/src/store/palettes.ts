import { Palettes } from '../types';

export interface SetPalettesAction {
  palettes: Palettes;
  type: 'SET_PALETTES';
}

export const SET_PALETTES = 'SET_PALETTES';

export const setPalettes = (palettes: Palettes): SetPalettesAction => ({
  palettes,
  type: SET_PALETTES,
});

export interface ResetPalettesAction {
  type: 'RESET_PALETTES';
}

export const RESET_PALETTES = 'RESET_PALETTES';

export const resetPalettes = (): ResetPalettesAction => ({
  type: RESET_PALETTES,
});

type PalettesActions = ResetPalettesAction | SetPalettesAction;

export interface PalettesState {
  palettes: Palettes | null;
}

const initialState: PalettesState = {
  palettes: null,
}

export const reducer = (state: PalettesState = initialState, action: PalettesActions) => {
  switch (action.type) {
    case SET_PALETTES: {
      return {
        ...state,
        palettes: action.palettes,
      }
    }
    case RESET_PALETTES: {
      return {
        ...state,
        palettes: null,
      }
    }
    default:
      return state;
  }
}
