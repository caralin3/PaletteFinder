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