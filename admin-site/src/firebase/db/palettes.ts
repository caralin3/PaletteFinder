import { Dispatch } from 'redux';
import { palettesState } from '../../store';
import { Palette } from '../../types';
import { db } from '../fb';

// CREATE
export const createPalette = (palette: Palette) => {
  db.ref('/palettes/').push(palette).then(() => {
    // dispatch(sessionState.setCurrentUser(user));
    console.log('Added', palette);
  });
}

// READ
export const getAllPalettes = (dispatch: Dispatch) => {
  db.ref('/palettes/').on('value', (snapshot: any) => {
    if (snapshot.val()) {
      console.log('palettes')
      dispatch(palettesState.setPalettes(snapshot.val()));
    } else {
      dispatch(palettesState.resetPalettes());
    }
  });
}

// export const getPalette = (id: string) => {
//   db.ref(`/palettes/${id}`).on('value', (snapshot: any) => {
//     if (snapshot.val()) {
//       console.log(snapshot.val())
//     }
//   });
// }

// UPDATE
export const updatePalette = (id: string, palette: Palette) => {
  db.ref(`/palettes/${id}`).update(palette).then(() => {
    console.log('Updated', palette);
  });
}

// DELETE
export const deletePalette = (id: string) => {
  db.ref(`/palettes/${id}`).remove().then(() => {
    console.log('Deleted', id);
  });
}
