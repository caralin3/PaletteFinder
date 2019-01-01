import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import {
  AddPage,
  EditPage,
  HomePage,
  LandingPage
} from '../pages';

export const Router = ({ history }: { history: History.History }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact={true} path={'/'} component={LandingPage} />
      <Route path={'/admin/add'} component={AddPage} />
      <Route path={'/admin/edit'} component={EditPage} />
      <Route path={'/admin'} component={HomePage} />
    </Switch>
  </ConnectedRouter>
);
