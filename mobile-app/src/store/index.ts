import createStore, { ApplicationState } from './createStore';
import { addAnswer, resetAnswers } from './answers';
import { hideFooter, hideHeader, toggleDrawer } from './layout';
import { updateScore, resetScore } from './score';

export {
  ApplicationState,
  addAnswer,
  createStore,
  hideFooter,
  hideHeader,
  resetAnswers,
  resetScore,
  toggleDrawer,
  updateScore
};
