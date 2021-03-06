import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { withAuthorization } from '../auth/withAuthorization';
import { Header, PaletteForm } from '../components';
import { ApplicationState } from '../store';
import { User } from '../types';

export interface AddPageProps { }

interface DispatchMappedProps {
  dispatch: Dispatch<any>;
}

interface StateMappedProps {
  currentUser: User | null;
}

interface AddMergedProps extends
  RouteComponentProps,
  StateMappedProps,
  DispatchMappedProps,
  AddPageProps {}

export interface AddPageState {}

class DisconnectedAddPage extends React.Component<AddMergedProps, AddPageState> {
  public readonly state: AddPageState = {  }

  public render() {
    return (
      <div className="add">
        <Header />
        <PaletteForm />
      </div>
    )
  }
}

const authCondition = (authUser: any) => !!authUser;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch });

const mapStateToProps = (state: ApplicationState) => ({
  currentUser: state.sessionState.currentUser,
});

export const AddPage = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(DisconnectedAddPage);