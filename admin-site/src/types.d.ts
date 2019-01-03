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

export interface Palette {
  description: string;
  // image: string;
  link: string;
  name: string;
  price: number;
  score: number;
}

export interface Palettes {
  [id: string]: Palette;
}
