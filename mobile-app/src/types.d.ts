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

export interface Choice {
  value: string | number;
  score: number;
}

export interface Question {
  choices: Choice[];
    prompt: string;
    number: number;
    type: 'lifestyle' | 'preference';

}

export interface Questions {
  [id: string]: Question
}
