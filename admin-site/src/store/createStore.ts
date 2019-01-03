import {
  connectRouter,
  routerMiddleware,
  RouterState
} from 'connected-react-router';
import * as History from 'history';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { palettesState, sessionState } from './index';

export interface ApplicationState {
  palettesState: palettesState.PalettesState,
  router: RouterState;
  sessionState: sessionState.SessionState,
}

export default (history: History.History): Store<ApplicationState> => {

  const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk)
  ) : compose(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk)
  );

  const rootReducer = combineReducers<ApplicationState>({
    palettesState: palettesState.reducer,
    router: connectRouter(history),
    sessionState: sessionState.reducer,
  });

  const persistConfig = {
    blacklist: [],
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return createStore(persistedReducer, middleware);
};
