import * as React from 'react';
import * as History from 'history';
import { BackHandler } from 'react-native';
import Config from 'react-native-config';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { persistStore } from 'redux-persist';
import { createHistory, Router } from './src/routes';
import { createStore, ApplicationState } from './src/store';
import { isIos } from './src/utility/detect';

const build = Config.BUILD;
const appId = Config.APP_ID;
console.log('Build', build);
console.log('ID', appId);

interface AppProps {}

export default class App extends React.Component<AppProps> {
  history: History.History = createHistory();

  store: Store<ApplicationState> = createStore(this.history);

  public componentWillMount() {
    persistStore(this.store);

    this.history.listen(location => {
      let screenName = location.pathname.substr(1);
      const firstIndex = screenName.indexOf('/');
      screenName = firstIndex > -1 ? screenName.substring(0, firstIndex) : screenName;
      console.log(screenName);
    });
  }

  public componentDidMount() {
    !isIos() && SplashScreen.hide();
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.history.goBack();
      return true;
    });
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => null);
  }
  
  public render() {
    return (
      <Provider store={this.store}>
        <Router history={this.history} />
      </Provider>
    );
  }
}