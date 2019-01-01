import * as React from 'react';
import { LoginForm, SignUpForm } from '../components';
import './Landing.css';

interface LandingPageProps {}

interface LandingPageState {
  login: boolean;
}

export class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
  public readonly state: LandingPageState = {
    login: true
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
