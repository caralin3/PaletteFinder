import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { auth, db } from '../firebase';
import { User } from '../types';
import { Form } from './';
import './SignUpForm.css';

interface SignUpFormProps {
  onClick: () => void;
}

interface DispatchMappedProps {
  dispatch: Dispatch<any>;
}

interface SignUpMergedProps extends
  RouteComponentProps,
  DispatchMappedProps,
  SignUpFormProps {}

interface SignUpFormState {
  email: string;
  error: any;
  name: string;
  password: string;
  passwordConfirm: string;
}

class DisconnectedSignUpForm extends React.Component<SignUpMergedProps, SignUpFormState> {
  public readonly state: SignUpFormState = {
    email: '',
    error: null,
    name: '',
    password: '',
    passwordConfirm: '',
  }

  public render() {
    const { email, error, name, password, passwordConfirm } = this.state;

    const isInvalid = password !== passwordConfirm || !password || !email || !name;

    return (
      <div className='signupForm'>
        <Form buttonText='Sign Up' disabled={isInvalid} submit={this.handleSubmit}>
          <div className="signupForm_form">
            <h2 className="signupForm_title">Sign Up</h2>
            {error && <p>{error.message}</p>}
            <label className="signupForm_label">Name</label>
            <input
              className='signupForm_input'
              onChange={(e) => this.handleChange(e, 'name')}
              placeholder='Name'
              type='text'
              value={name}
            />
            <label className="signupForm_label">Email</label>
            <input
              className='signupForm_input'
              onChange={(e) => this.handleChange(e, 'email')}
              placeholder='Email Address'
              type='text'
              value={email}
            />
            <label className="signupForm_label">Password</label>
            <input
              className='signupForm_input'
              onChange={(e) => this.handleChange(e, 'password')}
              placeholder='Password'
              type='password'
              value={password}
            />
            <label className="signupForm_label">Confirm Password</label>
            <input
              className='signupForm_input'
              onChange={(e) => this.handleChange(e, 'passwordConfirm')}
              placeholder='Confirm Password'
              type='password'
              value={passwordConfirm}
            />
          </div>
        </Form>
        <div>
          Already have an account? | <span className="signupForm_login" onClick={this.props.onClick}>Login</span>
        </div>
      </div>
    )
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>, propertyName: string) => {
    this.setState({
      [propertyName]: event.target.value,
    } as Pick<SignUpFormState, keyof SignUpFormState>);
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, name, password } = this.state;
    const { dispatch, history } = this.props;
    const names = name.split(' ');

    event.preventDefault();
    auth.doCreateUserWithEmailAndPassword(email, password)
    .then(async (user: any) => {
      const currentUser: User = {
        email,
        firstName: names[0],
        id: user.user.uid,
        lastName: names[names.length - 1],
      };
      // Create a user in database
      await db.requests.users.createUser(currentUser, dispatch);
      
    }).then(() => {
      this.setState({
        email: '',
        error: null,
        name: '',
        password: '',
        passwordConfirm: '',
      });
      history.push('admin');
    })
    .catch((error: any) => {
      this.setState({ error });
    });
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchMappedProps => ({ dispatch });

export const SignUpForm = compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(DisconnectedSignUpForm) as any;