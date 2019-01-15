import { Answers, Palettes, Results } from '../types';

// Actions
interface AddResultAction {
  payload: Results;
  type: 'ADD_RESULT';
}

export const saveResult = (timestamp: string, answers: Answers, palettes: Palettes): AddResultAction => ({
  payload: {
    [timestamp]: {
      answers,
      palettes
    }
  },
  type: 'ADD_RESULT'
});

interface ResetResultsAction {
  payload: Results | undefined;
  type: 'RESET_RESULTS';
}

export const resetResults = (): ResetResultsAction => ({
  payload: undefined,
  type: 'RESET_RESULTS'
});

type ActionTypes = AddResultAction | ResetResultsAction;

// Reducer
export interface ResultsState {
  results: Results | undefined;
}

const initialState: ResultsState = {
  results: undefined
};

export const reducer = (
  state: ResultsState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'ADD_RESULT':
      return {
        ...state,
        results: {
          ...state.results,
          ...action.payload
        }
      };
    case 'RESET_RESULTS':
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};