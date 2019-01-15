import createStore, { ApplicationState } from './createStore';
import { addAnswer, resetAnswers } from './answers';
import { hideFooter, hideHeader, toggleDrawer } from './layout';
import { setPalettes, resetPalettes } from './palettes';
import { saveResult, resetResults } from './results';
import { updateScore, resetScore } from './score';

export {
  ApplicationState,
  addAnswer,
  createStore,
  hideFooter,
  hideHeader,
  resetAnswers,
  resetPalettes,
  resetResults,
  resetScore,
  saveResult,
  setPalettes,
  toggleDrawer,
  updateScore
};
