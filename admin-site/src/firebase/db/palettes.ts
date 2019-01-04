import { Dispatch } from 'redux';
import { palettesState } from '../../store';
import { Palette } from '../../types';
import { db } from '../fb';

const dev = process.env.NODE_ENV === 'development';

// CREATE
export const createPalette = (palette: Palette) => {
  db.ref('/palettes/').push(palette).then(() => {
    if (dev) {
      console.log('Added', palette);
    }
  });
}

// READ
export const getAllPalettes = (dispatch: Dispatch) => {
  db.ref('/palettes/').on('value', (snapshot: any) => {
    if (snapshot.val()) {
      dispatch(palettesState.setPalettes(snapshot.val()));
    } else {
      dispatch(palettesState.resetPalettes());
    }
  });
}

// UPDATE
export const updatePalette = (id: string, palette: Palette) => {
  db.ref(`/palettes/${id}`).update(palette).then(() => {
    if (dev) {
      console.log('Updated', palette);
    }
  });
}

// DELETE
export const deletePalette = (id: string) => {
  db.ref(`/palettes/${id}`).remove().then(() => {
    if (dev) {
      console.log('Deleted', id);
    }
  });
}
