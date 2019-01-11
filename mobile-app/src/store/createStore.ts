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
import { ScoreState, reducer as scoreReducer  } from './score';

export interface ApplicationState {
  answers: AnswersState;
  layout: LayoutState;
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
    router: connectRouter(history),
    score: scoreReducer
  });

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['answers', 'score']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return createStore(persistedReducer, middleware);
};
