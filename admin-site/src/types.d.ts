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
  id: string;
  // image: string;
  link: string;
  name: string;
  price: number;
  score: number;
}
