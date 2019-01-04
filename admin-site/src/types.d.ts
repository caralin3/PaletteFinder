export interface Route {
  name: string;
  path: string;
}

export interface User {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
}

export interface Image {
  filename: string;
  palette: string;
  src: string;
}

export interface Palette {
  description: string;
  image: Image;
  link: string;
  name: string;
  price: number;
  score: number;
}

export interface Palettes {
  [id: string]: Palette;
}
