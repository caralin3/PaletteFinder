import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { textFonts, colors } from '../appearance';

export interface ResultProps {
  description: string;
  header?: string;
  image: string;
  price: number;
  link: string;
  name: string;
  // onPress: () => void;
}

export const Result: React.SFC<ResultProps> = (props) => (
  <View style={styles.container}>
    <Text style={StyleSheet.flatten([styles.header, styles.baseText])}>
      {props.header}
    </Text>
    <Text style={StyleSheet.flatten([styles.text, styles.baseText])}>
      {props.name} (${props.price})
    </Text>
    <Image 
      style={styles.image}
      source={require('../appearance/images/icon.png')}
    />
    <Text style={StyleSheet.flatten([styles.text, styles.baseText])}>
      {props.description}
    </Text>
    <Text style={StyleSheet.flatten([styles.link, styles.baseText])}>
      View on {props.link}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.powderPink,
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  baseText: {
    fontFamily: textFonts.primary,
    fontSize: 22
  },
  header: {
    color: colors.grapePurple,
    paddingBottom: 10,
  },
  text: {
    color: colors.grapePurple,
    textAlign: 'center'
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 100,
    resizeMode: 'contain'
  },
  link: {
    color: colors.neonPink,
    paddingTop: 10,
    textAlign: 'center'
  }
});
