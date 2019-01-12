import { push } from 'connected-react-router';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors } from '../appearance';
import { Button, Layout } from '../components';
import { content } from '../data';

interface ResultsStateMappedProps {}

interface ResultsDispatchMappedProps {
  navigate: (path: string) => any;
}

interface ResultsProps extends
  ResultsStateMappedProps,
  ResultsDispatchMappedProps {}

export const DisconnectedResults: React.SFC<ResultsProps> = (props) => (
  <Layout>
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{uri: 'https://picsum.photos/250/300'}} />
        <Text style={styles.copy}>{content.continueMsg}</Text>
      </View>
      <Button
        backgroundColor={colors.neonPink}
        onPress={() => props.navigate('/Home')}
        style={styles.button}
        text={content.continueButton}
        textColor={colors.white}
      />
    </View>
  </Layout>
);

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): ResultsDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const Results = connect(
  null,
  mapDispatchToProps
)(DisconnectedResults);

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
