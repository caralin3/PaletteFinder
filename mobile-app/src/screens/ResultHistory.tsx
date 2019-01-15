import { push } from 'connected-react-router';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout, Result } from '../components';
import { content } from '../data';
import { ApplicationState, resetResults } from '../store';
import { Palettes, Results } from '../types';

interface ResultHistoryStateMappedProps {
  results: Results | undefined;
}

interface ResultHistoryDispatchMappedProps {
  navigate: (path: string) => any;
  resetResults: () => void;
}

interface ResultHistoryProps {}

interface ResultHistoryMergedProps extends
  ResultHistoryStateMappedProps,
  ResultHistoryDispatchMappedProps,
  ResultHistoryProps {}

interface ResultHistoryState {
  palette: Palettes;
}

export class DisconnectedResultHistory extends React.Component<ResultHistoryMergedProps, ResultHistoryState> {
  public readonly state: ResultHistoryState = {
    palette: {} as Palettes,
  }

  private formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' 
      + date.getFullYear() + ' ' + date.toLocaleTimeString();
  }

  private handleClear = () => {
    const { navigate, resetResults } = this.props;
    resetResults();
    navigate('/Welcome');
  }

  public render() {
    const { navigate, results } = this.props;

    return (
      <Layout showHeader={true}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <Text style={styles.title}>
            Finder History
          </Text>
          {!!results ? Object.keys(results).map((key) => {
              const palettes = results[key].palettes;
              return (
                <View style={styles.results} key={key}>
                  <Text style={styles.copy}>{this.formatDate(key)}</Text>
                  <View style={styles.results}>
                    {Object.keys(palettes).map((key) => {
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
                  </View>
                </View>
              )}
            ) :
            <Text style={StyleSheet.flatten([styles.copy, !results && {alignSelf: 'center'}])}>
              {content.historyEmptyMsg}
            </Text>}
          <View style={styles.buttons}>
          {!!results && <Button
              backgroundColor={colors.neonPink}
              onPress={this.handleClear}
              style={styles.button}
              text={content.historyClearButton}
              textColor={colors.white}
            />}
            <Button
              backgroundColor={colors.neonPink}
              onPress={() => navigate('/Question/l1')}
              style={StyleSheet.flatten([styles.button, !results && {width: 250}])}
              text={content.historyResetButton}
              textColor={colors.white}
            />
          </View>
        </ScrollView>
      </Layout>
    )
  }
}

const mapStateToProps = (state: ApplicationState): ResultHistoryStateMappedProps => ({
  results: state.results.results
})

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): ResultHistoryDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path)),
  resetResults: () => dispatch(resetResults())
});

export const ResultHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedResultHistory);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontFamily: textFonts.header,
    fontSize: 32,
    paddingHorizontal: 25,
    paddingTop: 15
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
