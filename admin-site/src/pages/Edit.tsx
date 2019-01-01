import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { withAuthorization } from '../auth/withAuthorization';
import { Header, PaletteForm } from '../components';
import { ApplicationState } from '../store';
import { User } from '../types';

export interface EditPageProps { }

interface DispatchMappedProps {
  dispatch: Dispatch<any>;
}

interface StateMappedProps {
  currentUser: User | null;
}

interface EditMergedProps extends
  RouteComponentProps,
  StateMappedProps,
  DispatchMappedProps,
  EditPageProps {}

export interface EditPageState {}

class DisconnectedEditPage extends React.Component<EditMergedProps, EditPageState> {
  public readonly state: EditPageState = {  }

  public render() {
    return (
      <div className="edit">
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

export const EditPage = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(DisconnectedEditPage);