import { push } from 'connected-react-router';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors } from '../appearance/styles';
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
      <Text style={styles.title}>Welcome</Text>
      <View>
        <Image style={styles.image} source={{uri: 'https://picsum.photos/250/300'}} />
        <Text style={styles.copy}>{content.welcomeMsg}</Text>
      </View>
      <Button
        backgroundColor={colors.neonPink}
        onPress={() => props.navigate('/Question/l1')}
        style={styles.button}
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
  title: {
    color: colors.white,
    paddingTop: 40
  },
  copy: {
    color: colors.white,
    paddingVertical: 30,
    width: 250
  },
  button: {
    marginBottom: 50
  },
  image: {
    height: 300,
    width: 250,
  }
})
