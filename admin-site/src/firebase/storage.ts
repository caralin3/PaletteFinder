import { storage } from './fb';

export const uploadImage = (file: File, palette: string) => {
  const metadata = { palette };
  return storage.ref(`images/${file.name}`).put(file, metadata as any);
}

export const getImageUrl = (filename: string) => {
  return storage.ref(`images/${filename}`).getDownloadURL();
}

export const deleteImage = (filename: string) => {
  return storage.ref(`images/${filename}`).delete();
}
