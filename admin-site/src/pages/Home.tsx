import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { withAuthorization } from '../auth/withAuthorization';
import { Header } from '../components';
import { ApplicationState } from '../store';
import { User } from '../types';
import './Home.css';

export interface HomePageProps { }

interface DispatchMappedProps {
  dispatch: Dispatch<any>;
}

interface StateMappedProps {
  currentUser: User | null;
}

interface HomeMergedProps extends
  RouteComponentProps,
  StateMappedProps,
  DispatchMappedProps,
  HomePageProps {}

export interface HomePageState {}

class DisconnectedHomePage extends React.Component<HomeMergedProps, HomePageState> {
  public readonly state: HomePageState = {}

  public render() {
    return (
      <div className="home">
        <Header />
        <div className="home_header">
          <span className="home_title">Palettes</span>
          <Link className="home_add" to="/admin/add">+</Link>
        </div>
      </div>
    )
  }

}

const authCondition = (authUser: any) => !!authUser;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch });

const mapStateToProps = (state: ApplicationState) => ({
  currentUser: state.sessionState.currentUser,
});

export const HomePage = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(DisconnectedHomePage);