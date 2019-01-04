import { storage } from './fb';

export const uploadImage = (filename: string) => {
  // The storage path
  const path = `images/${filename}_${new Date().getTime()}`;
  // Totally optional metadata
  const customMetadata = { uploadedOn: new Date().toISOString() };
  const bucket = storage.ref('/images/');
  bucket.put(filename).then((snapshot) => {
    console.log('Uploaded', snapshot.ref.getDownloadURL);
  });
}
