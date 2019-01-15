import { push } from 'connected-react-router';
import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout, Result } from '../components';
import { content } from '../data';
import { ApplicationState } from '../store';
import { Palettes, Results } from '../types';

interface HomeStateMappedProps {
  results: Results | undefined;
}

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

  private getRecentResults = () => {
    const { results } = this.props;
    let palettes: Palettes = {} as Palettes;
    if (results) {
      Object.keys(results).map((key) => {
        palettes = results[key].palettes;
      });
    }
    return palettes;
  }

  public render() {
    const { navigate, results } = this.props;
    const palettes = this.getRecentResults();

    return (
      <Layout showHeader={true}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <Text style={StyleSheet.flatten([styles.title, {paddingTop: Dimensions.get('window').height / 15}])}>
            Welcome Back!
          </Text>
          <Text style={StyleSheet.flatten([styles.copy, !results && {alignSelf: 'center'}])}>
            {!!results ? content.homeMsg : content.homeEmptyMsg}
          </Text>
          {!!results && <View style={styles.results}>
            {!!palettes && Object.keys(palettes).map((key) => {
              const palette = palettes[key];
              return <Result
                key={key}
                description={palette.description}
                image={palette.image}
                link={palette.link}
                name={palette.name}
                price={palette.price}
              />
            })}
          </View>}
          <View style={styles.buttons}>
            {!!results && <Button
              backgroundColor={colors.neonPink}
              onPress={() => navigate('/ResultHistory')}
              style={styles.button}
              text={content.homeHistoryButton}
              textColor={colors.white}
            />}
            <Button
              backgroundColor={colors.neonPink}
              onPress={() => navigate('/Question/l1')}
              style={StyleSheet.flatten([styles.button, !results && {width: 250}])}
              text={content.homeResetButton}
              textColor={colors.white}
            />
          </View>
        </ScrollView>
      </Layout>
    )
  }
}

const mapStateToProps = (state: ApplicationState): HomeStateMappedProps => ({
  results: state.results.results
})

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): HomeDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const Home = connect(
  mapStateToProps,
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
