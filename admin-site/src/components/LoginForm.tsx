import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { auth } from '../firebase';
import { Form } from './';
import './LoginForm.css';

interface LoginFormProps extends RouteComponentProps {
  onClick: () => void;
}

interface LoginFormState {
  email: string;
  error: any;
  password: string;
}

class DisconnectedLoginForm extends React.Component<LoginFormProps, LoginFormState> {
  public readonly state: LoginFormState = {
    email: '',
    error: null,
    password: '',
  }

  public render() {
    const { email, error, password } = this.state;

    // const isInvalid = !password || !email;

    return (
      <div className='loginForm'>
        <Form buttonText='Log In' submit={this.handleSubmit}>
          <div className="loginForm_form">
            <h2 className="loginForm_title">Login</h2>
            {error && <p>{error.message}</p>}
            <label className="loginForm_label">Email</label>
            <input
              className='loginForm_input'
              onChange={(e) => this.handleChange(e, 'email')}
              placeholder='Email Address'
              type='text'
              value={email}
            />
            <label className="loginForm_label">Password</label>
            <input
              className='loginForm_input'
              placeholder='Password'
              onChange={(e) => this.handleChange(e, 'password')}
              type='password'
              value={password}
            />
          </div>
        </Form>
        {/* <div>
          Don't have an account? | <span className="loginForm_signup" onClick={this.props.onClick}>Sign Up</span>
        </div> */}
      </div>
    )
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>, propertyName: string) => {
    this.setState({
      [propertyName]: event.target.value,
    } as Pick<LoginFormState, keyof LoginFormState>);
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;
    const { history } = this.props;

    event.preventDefault();
    auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({
        email: '',
        error: null,
        password: '',
      });
      history.push('/admin');
    })
    .catch((error: any) => {
      this.setState({ error });
    });
  }
}

export const LoginForm = withRouter(DisconnectedLoginForm);
