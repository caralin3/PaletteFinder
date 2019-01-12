import { Platform } from 'react-native';

export interface TextFonts {
  primary: string;
  header: string;
}

export const textFonts: TextFonts = {
  primary: 'Karla-Bold',
  header: 'CherrySwash-Bold',
};

export interface TextSizes {
  [key: string]: number;
  xxsmall: number;
  xsmall: number;
  small: number;
  regular: number;
  large: number;
  xlarge: number;
  xxlarge: number;
  hero: number;
}

export const textSizes: { [TextSizes: string]: number } = {
  xxsmall: 8,
  xsmall: 10,
  small: 12,
  regular: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  hero: 24,
};

let x: { [index: string]: { message: string}} = {};
