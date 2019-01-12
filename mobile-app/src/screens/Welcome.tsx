import { push } from 'connected-react-router';
import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout } from '../components';
import { content } from '../data';

interface WelcomeStateMappedProps {}

interface WelcomeDispatchMappedProps {
  navigate: (path: string) => any;
}

interface WelcomeProps extends
  WelcomeStateMappedProps,
  WelcomeDispatchMappedProps {}

export const DisconnectedWelcome: React.SFC<WelcomeProps> = (props) => (
  <Layout>
    <View style={styles.container}>
      <Text style={StyleSheet.flatten([styles.title, {paddingTop: Dimensions.get('window').height / 15}])}>Welcome</Text>
      <View style={styles.middle}>
        <Image 
          style={styles.image}
          source={require('../appearance/images/icon.png')}
        />
        <Text style={styles.copy}>{content.welcomeMsg}</Text>
      </View>
      <Button
        backgroundColor={colors.neonPink}
        onPress={() => props.navigate('/Question/l1')}
        style={{marginBottom: Dimensions.get('window').height / 15}}
        text={content.welcomeButton}
        textColor={colors.white}
      />
    </View>
  </Layout>
);

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): WelcomeDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const Welcome = connect(
  null,
  mapDispatchToProps
)(DisconnectedWelcome);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  middle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: colors.white,
    fontFamily: textFonts.header,
    fontSize: 32
  },
  copy: {
    color: colors.white,
    fontFamily: textFonts.primary,
    fontSize: 24,
    paddingHorizontal: 40,
    paddingVertical: 30,
    textAlign: 'center',
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  }
})
