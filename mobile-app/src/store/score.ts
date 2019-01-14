
// Actions
interface UpdateScoreAction {
  payload: number;
  type: 'UPDATE_SCORE';
}

export const updateScore = (score: number): UpdateScoreAction => ({
  payload: score,
  type: 'UPDATE_SCORE'
});

interface ResetScoreAction {
  payload: number;
  type: 'RESET_SCORE';
}

export const resetScore = (): ResetScoreAction => ({
  payload: 0,
  type: 'RESET_SCORE'
});

type ActionTypes = UpdateScoreAction | ResetScoreAction;

// Reducer
export interface ScoreState {
  score: number;
}

const initialState: ScoreState = {
  score: 0
};

export const reducer = (
  state: ScoreState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: state.score + action.payload
      };
    case 'RESET_SCORE':
      return {
        ...state,
        score: action.payload
      };
    default:
      return state;
  }
};