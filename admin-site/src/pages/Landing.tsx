import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { LoginForm, SignUpForm } from '../components';
import { ApplicationState } from '../store';
import { User } from '../types';
import './Landing.css';

interface LandingPageProps {}

interface StateMappedProps {
  currentUser: User | null;
}

interface LandingMergedProps extends
  RouteComponentProps,
  StateMappedProps,
  LandingPageProps {}

interface LandingPageState {
  login: boolean;
}

export class DisconnectedLandingPage extends React.Component<LandingMergedProps, LandingPageState> {
  public readonly state: LandingPageState = {
    login: true
  }

  public componentWillReceiveProps(nextProps: LandingMergedProps) {
    const { currentUser, history } = nextProps;
    if (currentUser) {
      history.push('/admin');
    }
  }

  public render() {
    const { login } = this.state;

    return (
      <div className="landing">
        <h1 className="landing_title">Eyeshadow Palette Finder Admin</h1>
        {login ? <LoginForm onClick={() => this.setState({login: false})} /> :
        <SignUpForm onClick={() => this.setState({login: true})} />}
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  currentUser: state.sessionState.currentUser,
});

export const LandingPage = compose(
  withRouter,
  connect(mapStateToProps)
)(DisconnectedLandingPage);
