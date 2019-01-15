import * as React from 'react';
import { Image as RNImage, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { textFonts, colors } from '../appearance';
import { Image } from '../types';

export interface ResultProps {
  description: string;
  header?: string;
  image: Image;
  price: number;
  link: string;
  name: string;
}

export class Result extends React.Component<ResultProps> {

  private handleLink = () => {
    const { link } = this.props;
    Linking.openURL(link).catch(err => console.error('An error occurred', err));
  }

  private formattedLink = () => {
    const { link } = this.props;
    const url = link.split('/');
    return url[2].slice(4);
  }

  public render() {
    const { description, header, image, name, price } = this.props;
    return (
      <View style={styles.container}>
        {!!header && <Text style={StyleSheet.flatten([styles.header, styles.baseText])}>
          {header}
        </Text>}
        <Text style={StyleSheet.flatten([styles.text, styles.baseText])}>
          {name} (${price})
        </Text>
        <RNImage
          style={styles.image}
          source={{uri: image.src} || require('../appearance/images/icon.png')}
        />
        <Text style={StyleSheet.flatten([styles.text, styles.baseText])}>
          {description}
        </Text>
        <TouchableOpacity onPress={this.handleLink}>
          <Text style={StyleSheet.flatten([styles.link, styles.baseText])}>
            View on {this.formattedLink()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    paddingVertical: 10,
    resizeMode: 'contain',
    width: 200
  },
  link: {
    color: colors.neonPink,
    paddingTop: 10,
    textAlign: 'center'
  }
});
