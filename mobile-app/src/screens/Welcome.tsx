import { push } from 'connected-react-router';
import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout } from '../components';
import { content } from '../data';
import { Results } from '../types';
import { ApplicationState } from '../store';

interface WelcomeStateMappedProps {
  results: Results | undefined;
}

interface WelcomeDispatchMappedProps {
  navigate: (path: string) => any;
}

interface WelcomeProps extends
  WelcomeStateMappedProps,
  WelcomeDispatchMappedProps {}

export class DisconnectedWelcome extends React.Component<WelcomeProps> {
  public render() {
    const { navigate, results } = this.props;
    return (
      <Layout showHeader={true}>
        <Text
          style={StyleSheet.flatten([
            styles.title,
            {
              paddingTop: !!results ? Dimensions.get('window').height / 15 : 10,
              paddingBottom: !!results ? 10 : 0
            }
          ])}
        >
          Welcome {!!results && 'Back!'}
        </Text>
        {!!results ?
        <View style={styles.buttons}>
          <Image 
            style={styles.image}
            source={require('../appearance/images/icon.png')}
          />
          <Button
            backgroundColor={colors.neonPink}
            onPress={() => navigate('/Home')}
            style={{marginBottom: Dimensions.get('window').height / 25}}
            text={content.welcomeChoice1}
            textColor={colors.white}
          />
          <Button
            backgroundColor={colors.neonPink}
            onPress={() => navigate('/Question/l1')}
            style={{marginBottom: Dimensions.get('window').height / 25}}
            text={content.welcomeChoice2}
            textColor={colors.white}
          />
        </View>
           : <View style={styles.container}>
          <View style={styles.middle}>
            <Image 
              style={styles.image}
              source={require('../appearance/images/icon.png')}
            />
            <Text style={styles.copy}>{content.welcomeMsg}</Text>
          </View>
          <Button
            backgroundColor={colors.neonPink}
            onPress={() => navigate('/Question/l1')}
            style={{marginBottom: Dimensions.get('window').height / 25}}
            text={content.welcomeButton}
            textColor={colors.white}
          />
        </View>}
      </Layout>
    );
  }
}

const mapStateToProps = (state: ApplicationState): WelcomeStateMappedProps => ({
  results: state.results.results
})

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): WelcomeDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const Welcome = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedWelcome);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  buttons: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around'
  },
  middle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    color: colors.white,
    fontFamily: textFonts.header,
    fontSize: 32,
    paddingTop: 5
  },
  copy: {
    color: colors.white,
    fontFamily: textFonts.primary,
    fontSize: 22,
    paddingHorizontal: 40,
    paddingVertical: 30,
    textAlign: 'center',
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  }
})
