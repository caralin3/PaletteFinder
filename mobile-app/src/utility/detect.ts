import { Dimensions, Platform } from 'react-native';

export const isIphoneX = () => {
  const { width, height } = Dimensions.get('window');
  return (
      Platform.OS === 'ios' &&
      !(Platform as any)['isPad'] &&
      !(Platform as any)['isTVOS'] &&
      (height === 812 || width === 812)
  );
}

export const isLandscape = () => {
  const window = Dimensions.get('window');
  return window.height < window.width;
}

export const isIos = () => {
  return Platform.OS === 'ios';
}
