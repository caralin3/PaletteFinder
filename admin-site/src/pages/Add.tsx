import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { withAuthorization } from '../auth/withAuthorization';
import { Form, Header } from '../components';
import { ApplicationState } from '../store';
import { User } from '../types';
import './Add.css';

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

export interface AddPageState {
  description: string;
  image: string;
  link: string;
  name: string;
  price: number;
  score: number;
}

class DisconnectedAddPage extends React.Component<AddMergedProps, AddPageState> {
  public readonly state: AddPageState = {
    description: '',
    image: '',
    link: '',
    name: '',
    price: 0,
    score: 0,
  }

  public render() {
    const { description, link, name, price, score } = this.state;

    const isInvalid = !description || !link || !name || !price || !score;

    return (
      <div className="add">
        <Header />
        <div className="addForm">
          <Form className="addForm_form" buttonText='Add' disabled={isInvalid} submit={this.handleSubmit}>
            <h2 className="addForm_title">New Palette</h2>
            <div className="addForm_row">
              <div className="addForm_left">
                <label className="addForm_label">
                  <span className="addForm_label-text">Palette Name</span>
                  <input
                    className="addForm_input addForm_name"
                    onChange={(e) => this.handleChange(e, 'name')}
                    placeholder="Palette"
                    type="text"
                    value={name}
                  />
                </label>
                <label className="addForm_label">
                <span className="addForm_label-text">Description</span>
                  <textarea
                    className="addForm_input addForm_description"
                    placeholder="Enter a description..."
                    onChange={(e) => this.handleChange(e, 'description')}
                    value={description}
                  />
                </label>
              </div>
              <div className="addForm_imageUpload">
                Image
              </div>
            </div>
            <div className="addForm_inputs">
              <label className="addForm_label">
                <span className="addForm_label-text">Price</span>
                <input
                  className="addForm_input"
                  onChange={(e) => this.handleChange(e, 'price')}
                  placeholder="$"
                  type="number"
                  value={price}
                />
              </label>
              <label className="addForm_label">
                <span className="addForm_label-text">Link</span>
                <input
                  className="addForm_input addForm_link"
                  placeholder="Link to palette"
                  onChange={(e) => this.handleChange(e, 'link')}
                  type="text"
                  value={link}
                />
              </label>
              <label className="addForm_label">
                <span className="addForm_label-text">Score</span>
                <input
                  className="addForm_input"
                  onChange={(e) => this.handleChange(e, 'score')}
                  placeholder="Score"
                  type="number"
                  value={score}
                />
              </label>
            </div>
          </Form>
        </div>
      </div>
    )
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, propertyName: string) => {
    this.setState({
      [propertyName]: event.target.value as any,
    } as Pick<AddPageState, keyof AddPageState>);
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const { description, image, link, name, price, score } = this.state;
    // const { history } = this.props;

    event.preventDefault();
    // auth.doSignInWithEmailAndPassword(email, password)
    // .then(() => {
    //   this.setState({
    //     email: '',
    //     error: null,
    //     password: '',
    //   });
    //   history.push('/admin');
    // })
    // .catch((error: any) => {
    //   this.setState({ error });
    // });
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