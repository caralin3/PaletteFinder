import createStore, { ApplicationState } from './createStore';
import { addAnswer, resetAnswers } from './answers';
import { hideFooter, hideHeader, toggleDrawer } from './layout';
import { setPalettes, resetPalettes } from './palettes';
import { updateScore, resetScore } from './score';

export {
  ApplicationState,
  addAnswer,
  createStore,
  hideFooter,
  hideHeader,
  resetAnswers,
  resetPalettes,
  resetScore,
  setPalettes,
  toggleDrawer,
  updateScore
};
