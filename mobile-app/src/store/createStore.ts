import { AsyncStorage } from 'react-native';
import {
  connectRouter,
  routerMiddleware,
  RouterState
} from 'connected-react-router';
import * as History from 'history';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Store
} from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { AnswersState, reducer as answersReducer  } from './answers';
import { LayoutState, reducer as layoutReducer  } from './layout';
import { PalettesState, reducer as palettesReducer  } from './palettes';
import { ResultsState, reducer as resultsReducer  } from './results';
import { ScoreState, reducer as scoreReducer  } from './score';

export interface ApplicationState {
  answers: AnswersState;
  layout: LayoutState;
  palettes: PalettesState;
  results: ResultsState;
  router: RouterState;
  score: ScoreState;
}

export default (history: History.History): Store<ApplicationState> => {
  const composeEnhancers = __DEV__
    ? composeWithDevTools({ realtime: true })
    : compose;

  const middleware = composeEnhancers(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk)
  );

  const rootReducer = combineReducers<ApplicationState>({
    answers: answersReducer,
    layout: layoutReducer,
    palettes: palettesReducer,
    router: connectRouter(history),
    results: resultsReducer,
    score: scoreReducer
  });

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['answers', 'palettes', 'results', 'score']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return createStore(persistedReducer, middleware);
};
