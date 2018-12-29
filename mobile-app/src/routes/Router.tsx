import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import { StyleSheet, View } from 'react-native';
import { Route } from 'react-router';
import { Home } from '../screens';

export const Router = ({ history }: { history: History.History }) => (
  <ConnectedRouter history={history}>
    <View style={styles.container}>
      <Route exact={true} path={'/'} component={Home} />
      <Route path={'/Home'} component={Home} />
    </View>
  </ConnectedRouter>
);

const styles = StyleSheet.create({
  container: { flex: 1 }
});
