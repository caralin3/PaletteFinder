import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import { StyleSheet, View } from 'react-native';
import { Route } from 'react-router';
import { Continue, Home, Question, ResultHistory, Results, Welcome } from '../screens';

export const Router = ({ history }: { history: History.History }) => (
  <ConnectedRouter history={history}>
    <View style={styles.container}>
      <Route exact={true} path={'/'} component={Welcome} />
      <Route path={'/Home'} component={Home} />
      <Route path={'/Question/:id'} component={Question} />
      <Route path={'/Continue'} component={Continue} />
      <Route path={'/Results'} component={Results} />
      <Route path={'/ResultHistory'} component={ResultHistory} />
      {/* <Route path={'/AnswerHistory'} component={AnswerHistory} /> */}
    </View>
  </ConnectedRouter>
);

const styles = StyleSheet.create({
  container: { flex: 1 }
});
