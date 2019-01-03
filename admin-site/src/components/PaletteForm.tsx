import { RouterState } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { palettes } from '../db';
import { ApplicationState } from '../store';
import { Form } from './';
import './PaletteForm.css';

export interface PaletteFormProps {}

interface DispatchMappedProps {
  dispatch: Dispatch<any>;
}

interface StateMappedProps {
  router: RouterState;
}

export interface RouteParams {
  id: string;
}

interface PaletteFormMergedProps extends
  RouteComponentProps<RouteParams>,
  StateMappedProps,
  DispatchMappedProps,
  PaletteFormProps {}

export interface PaletteFormState {
  description: string;
  id: string;
  image: string;
  link: string;
  name: string;
  price: number;
  score: number;
}

class DisconnectedPaletteForm extends React.Component<PaletteFormMergedProps, PaletteFormState> {
  public readonly state: PaletteFormState = {
    description: '',
    id: '',
    image: '',
    link: '',
    name: '',
    price: 0,
    score: 0,
  }

  public componentWillMount() {
    const id = this.props.match.params.id;
    const palette = palettes[id];
    if (id) {
      this.setState({
        description: palette.description,
        id,
        // image: '',
        link: palette.link,
        name: palette.name,
        price: palette.price,
        score: palette.score,
      });
    }
  }

  public render() {
    const { description, id, link, name, price, score } = this.state;

    const isInvalid = !description || !link || !name || !price || !score;

    return (
      <div className="paletteForm">
        <Form
          className="paletteForm_form"
          buttonText={id ? 'Update' : 'Add'}
          disabled={isInvalid}
          submit={id ? this.handleEdit : this.handleAdd}
        >
          <h2 className="paletteForm_title">{ id ? 'Edit Palette' : 'New Palette' }</h2>
          <div className="paletteForm_row">
            <div className="paletteForm_left">
              <label className="paletteForm_label">
                <span className="paletteForm_label-text">Palette Name</span>
                <input
                  className="paletteForm_input paletteForm_name"
                  onChange={(e) => this.handleChange(e, 'name')}
                  // placeholder="Palette"
                  type="text"
                  value={name}
                />
              </label>
              <label className="paletteForm_label">
              <span className="paletteForm_label-text">Description</span>
                <textarea
                  className="paletteForm_input paletteForm_description"
                  // placeholder="Enter a description..."
                  onChange={(e) => this.handleChange(e, 'description')}
                  value={description}
                />
              </label>
            </div>
            <div className="paletteForm_imageUpload">
              Image
            </div>
          </div>
          <div className="paletteForm_inputs">
            <label className="paletteForm_label">
              <span className="paletteForm_label-text">Price</span>
              <input
                className="paletteForm_input"
                onChange={(e) => this.handleChange(e, 'price')}
                // placeholder="$"
                type="number"
                value={price}
              />
            </label>
            <label className="paletteForm_label">
              <span className="paletteForm_label-text">Link</span>
              <input
                className="paletteForm_input paletteForm_link"
                // placeholder="Link to palette"
                onChange={(e) => this.handleChange(e, 'link')}
                type="text"
                value={link}
              />
            </label>
            <label className="paletteForm_label">
              <span className="paletteForm_label-text">Score</span>
              <input
                className="paletteForm_input"
                onChange={(e) => this.handleChange(e, 'score')}
                // placeholder="Score"
                type="number"
                value={score}
              />
            </label>
          </div>
        </Form>
      </div>
    )
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, propertyName: string) => {
    this.setState({
      [propertyName]: event.target.value as any,
    } as Pick<PaletteFormState, keyof PaletteFormState>);
  }

  // private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   // const { description, image, link, name, price, score } = this.state;
  //   // const { history } = this.props;

  //   event.preventDefault();
  //   // auth.doSignInWithEmailAndPassword(email, password)
  //   // .then(() => {
  //   //   this.setState({
  //   //     email: '',
  //   //     error: null,
  //   //     password: '',
  //   //   });
  //   //   history.push('/admin');
  //   // })
  //   // .catch((error: any) => {
  //   //   this.setState({ error });
  //   // });
  // }

  private handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Add');
  }

  private handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Edit', this.state.id);
  }
}

// const authCondition = (authUser: any) => !!authUser;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch });

const mapStateToProps = (state: ApplicationState) => ({
  router: state.router
});

export const PaletteForm = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(DisconnectedPaletteForm);