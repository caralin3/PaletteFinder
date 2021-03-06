import { RouterState } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import { storage } from '../firebase';
import { requests } from '../firebase/db';
import { ApplicationState } from '../store';
import { Image, Palette, Palettes } from '../types';
import { Form, ImageUpload } from './';
import './PaletteForm.css';

export interface PaletteFormProps {}

interface DispatchMappedProps {
  dispatch: Dispatch<any>;
}

interface StateMappedProps {
  palettes: Palettes | null;
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
  changed: boolean;
  description: string;
  editImage: boolean;
  file: File;
  id: string;
  image: Image;
  link: string;
  name: string;
  palette: Palette;
  price: number;
  score: number;
}

class DisconnectedPaletteForm extends React.Component<PaletteFormMergedProps, PaletteFormState> {
  public readonly state: PaletteFormState = {
    changed: true,
    description: '',
    editImage: false,
    file: {} as File,
    id: '',
    image: {} as Image,
    link: '',
    name: '',
    palette: {} as Palette,
    price: 0,
    score: 0,
  }

  public componentDidMount() {
    const id = this.props.match.params.id;
    const palette = this.props.palettes ? this.props.palettes[id] : {} as Palette;
    if (id) {
      this.setState({
        description: palette.description,
        editImage: true,
        id,
        image: palette.image,
        link: palette.link,
        name: palette.name,
        palette,
        price: palette.price,
        score: palette.score,
      });
    }
  }

  public render() {
    const { changed, description, editImage, file, id, image, link, name, price, score } = this.state;

    const isInvalid = !description || !link || !name || !price || !score || !file.name;

    return (
      <div className="paletteForm">
        <Form
          className="paletteForm_form"
          buttonText={id ? 'Update' : 'Add'}
          disabled={isInvalid}
          submit={id ? this.handleEdit : this.handleAdd}
        >
          <h2 className="paletteForm_title">{ id ? 'Edit Palette' : 'New Palette' }</h2>
          {(id && !changed) && <h4 className="paletteForm_alert">No change</h4>}
          <div className="paletteForm_row">
            <div className="paletteForm_left">
              <label className="paletteForm_label">
                <span className="paletteForm_label-text">Palette Name</span>
                <input
                  className="paletteForm_input paletteForm_name"
                  onChange={(e) => this.handleChange(e, 'name')}
                  type="text"
                  value={name}
                />
              </label>
              <label className="paletteForm_label">
              <span className="paletteForm_label-text">Description</span>
                <textarea
                  className="paletteForm_input paletteForm_description"
                  onChange={(e) => this.handleChange(e, 'description')}
                  value={description}
                />
              </label>
            </div>
            <div className="paletteForm_imageUpload">
              {editImage ?
                <img className="paletteForm_image" src={image.src} alt={image.palette} onClick={this.toggleEditImage} /> :
                id ? <ImageUpload onClick={this.toggleEditImage} onUpload={this.handleImage} /> :
                <ImageUpload onUpload={this.handleImage} />
              }
            </div>
          </div>
          <div className="paletteForm_inputs">
            <label className="paletteForm_label">
              <span className="paletteForm_label-text">Price</span>
              <input
                className="paletteForm_input"
                onChange={(e) => this.handleChange(e, 'price')}
                type="number"
                value={price}
              />
            </label>
            <label className="paletteForm_label">
              <span className="paletteForm_label-text">Link</span>
              <input
                className="paletteForm_input paletteForm_link"
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
                type="number"
                value={score}
              />
            </label>
          </div>
        </Form>
      </div>
    )
  }

  private toggleEditImage = () => this.setState({ editImage: !this.state.editImage});

  private handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, propertyName: string) => {
    this.setState({
      [propertyName]: event.target.value as any,
    } as Pick<PaletteFormState, keyof PaletteFormState>);
  }

  private handleImage = (file: File) => this.setState({ file });

  private handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    const { description, file, link, name, price, score } = this.state;
    const { history } = this.props;
    event.preventDefault();
    storage.uploadImage(file, name).then(() => {
      storage.getImageUrl(file.name).then((url: string) => {
        const image: Image = {
          filename: file.name,
          palette: name,
          src: url,
        };
        const newPalette: Palette = {
          description,
          image,
          link,
          name,
          price,
          score
        }
        requests.palettes.createPalette(newPalette);
      });
    });    
    history.push('/admin');
  }

  private handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    const { description, id, image, file, link, name, palette, price, score } = this.state;
    const { history } = this.props;
    event.preventDefault();
    if (file.name) {
      storage.deleteImage(image.filename);
      storage.uploadImage(file, name).then(() => {
        storage.getImageUrl(file.name).then((url: string) => {
          const newImage: Image = {
            filename: file.name,
            palette: name,
            src: url,
          };
          const updatedPalette: Palette = {
            description,
            image: newImage,
            link,
            name,
            price,
            score
          }
          requests.palettes.updatePalette(id, updatedPalette);
        });
      });
      history.push('/admin');
    } else {
      const updatedPalette: Palette = {
        description,
        image,
        link,
        name,
        price,
        score
      }
      if (JSON.stringify(palette) !== JSON.stringify(updatedPalette)) {
        requests.palettes.updatePalette(id, updatedPalette);
        history.push('/admin');
      } else {
        this.setState({
          changed: false
        })
      }
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch });

const mapStateToProps = (state: ApplicationState) => ({
  palettes: state.palettesState.palettes,
  router: state.router
});

export const PaletteForm = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(DisconnectedPaletteForm);