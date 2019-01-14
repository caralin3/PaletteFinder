import { push } from 'connected-react-router';
import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout } from '../components';
import { content } from '../data';

interface ContinueStateMappedProps {}

interface ContinueDispatchMappedProps {
  navigate: (path: string) => any;
}

interface ContinueProps extends
  ContinueStateMappedProps,
  ContinueDispatchMappedProps {}

export const DisconnectedContinue: React.SFC<ContinueProps> = (props) => (
  <Layout showHeader={true}>
    <View style={styles.container}>
      <Text style={styles.copy}>{content.continueMsg}</Text>
      <Image
        style={styles.image}
        source={require('../appearance/images/icon.png')}
      />
      <Button
        backgroundColor={colors.neonPink}
        onPress={() => props.navigate('/Question/p1')}
        style={styles.button}
        text={content.continueButton}
        textColor={colors.white}
      />
    </View>
  </Layout>
);

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): ContinueDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const Continue = connect(
  null,
  mapDispatchToProps
)(DisconnectedContinue);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  copy: {
    color: colors.white,
    fontFamily: textFonts.primary,
    fontSize: 22,
    paddingHorizontal: 40,
    paddingTop: 75,
    textAlign: 'center',
  },
  button: {
    marginBottom: 50
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  }
})
