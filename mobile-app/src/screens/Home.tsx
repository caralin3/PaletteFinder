import { push } from 'connected-react-router';
import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout, Result } from '../components';
import { content } from '../data';
import { Palettes, Image } from '../types';

interface HomeStateMappedProps {}

interface HomeDispatchMappedProps {
  navigate: (path: string) => any;
}

interface HomeProps {}

interface HomeMergedProps extends
  HomeStateMappedProps,
  HomeDispatchMappedProps,
  HomeProps {}

interface HomeState {
  palette: Palettes;
}

export class DisconnectedHome extends React.Component<HomeMergedProps, HomeState> {
  public readonly state: HomeState = {
    palette: {} as Palettes,
  }

  public render() {
    

    const { navigate } = this.props;

    return (
      <Layout showHeader={true}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <Text style={StyleSheet.flatten([styles.title, {paddingTop: Dimensions.get('window').height / 15}])}>
            Welcome Back!
          </Text>
          <Text style={styles.copy}>{content.homeMsg}</Text>
          <View style={styles.results}>
            <Result
              description="A palette with beautiful colors for girl on a budget."
              image={{} as Image}
              link="ulta.com"
              name="Makeup Revolution Reloaded Palette Division"
              price={7}
            />
            <Result
              description="A palette with beautiful colors for girl on a budget."
              image={{} as Image}
              link="sephora.com"
              name="Huda Beauty the New Nude Palette"
              price={6}
            />
          </View>
          <View style={styles.buttons}>
            <Button
              backgroundColor={colors.neonPink}
              onPress={() => navigate('/ResultHistory')}
              style={styles.button}
              text={content.homeHistoryButton}
              textColor={colors.white}
            />
            <Button
              backgroundColor={colors.neonPink}
              onPress={() => this.props.navigate('/Question/l1')}
              style={styles.button}
              text={content.homeResetButton}
              textColor={colors.white}
            />
          </View>
        </ScrollView>
      </Layout>
    )
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): HomeDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const Home = connect(
  null,
  mapDispatchToProps
)(DisconnectedHome);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: colors.white,
    fontFamily: textFonts.header,
    fontSize: 32
  },
  copy: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontFamily: textFonts.primary,
    fontSize: 22,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  results: {
    flex: 1,
    marginHorizontal: 25,
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 30,
    width: 165
  }
})
