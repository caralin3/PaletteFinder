const colors = {
  grapePurple: '#321547',
  lavender: '#B88935',
  neonPink: '#e90798',
  orangeYellow: '#f5a623',
  powderPink: '#f4b2d9',

  // general colors
  white: '#fff',
  black: '#000000',
};

export type Colors = typeof colors;

export default colors;

// type guard
export function isKeyOfColor(key?: any): key is keyof Colors {
  return !!key && !!Object.keys(colors).filter(colorName => colorName === key).length;
}
