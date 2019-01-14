import * as React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { textFonts } from '../appearance';

export interface ButtonProps {
  backgroundColor: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
  textColor: string;
}

export const Button: React.SFC<ButtonProps> = (props) => (
  <TouchableOpacity
    activeOpacity={0.1}
    onPress={props.onPress}
    style={StyleSheet.flatten([styles.container, props.style, {backgroundColor: props.backgroundColor}])}
  >
    <Text style={StyleSheet.flatten([styles.text, {color: props.textColor}])}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: 250
  },
  text: {
    fontFamily: textFonts.primary,
    fontSize: 20,
    textAlign: 'center'
  }
});
