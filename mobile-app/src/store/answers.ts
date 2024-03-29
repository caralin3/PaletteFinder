import { Answers, Choice } from '../types';

// Actions
interface AddAnswerAction {
  payload: Answers;
  type: 'ADD_ANSWER';
}

export const addAnswer = (id: string, choice: Choice): AddAnswerAction => ({
  payload: {
    [id]: choice
  },
  type: 'ADD_ANSWER'
});

interface ResetAnswersAction {
  payload: Answers;
  type: 'RESET_ANSWERS';
}

export const resetAnswers = (): ResetAnswersAction => ({
  payload: {},
  type: 'RESET_ANSWERS'
});

type ActionTypes = AddAnswerAction | ResetAnswersAction;

// Reducer
export interface AnswersState {
  answers: Answers | undefined;
}

const initialState: AnswersState = {
  answers: undefined
};

export const reducer = (
  state: AnswersState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          ...action.payload
        }
      };
    case 'RESET_ANSWERS':
      return {
        ...state,
        answers: action.payload
      };
    default:
      return state;
  }
};