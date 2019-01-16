import { push } from 'connected-react-router';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout, Result, Accordion } from '../components';
import { content } from '../data';
import { ApplicationState, resetResults } from '../store';
import { Palettes, Results } from '../types';
import { AccordionData } from '../components/Accordion';

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
    const t = new Date(timestamp);
    const date = (t.getMonth() + 1) + '/' + t.getDate() + '/' + t.getFullYear();
    let h = t.getHours();
    let m = t.getMinutes();
    let dd = 'AM';
    if (h >= 12) {
      h -= 12;
      dd = 'PM';
    }
    if (h == 0) {
      h = 12;
    }
    const time = h + ':' + (m < 10 ? '0' : '') + m + ' ' + dd;
    return ( date + ' ' + time);
  }

  private handleClear = () => {
    const { resetResults } = this.props;
    resetResults();
  }

  private getResults = () => {
    const { results } = this.props;
    const data: AccordionData[] = [];
    if (results) {
      const keys = Object.keys(results);
      for ( let i = keys.length - 1; i >= 0; i-- ) {
        const timestamp = keys[i];
        const palettes = results[timestamp].palettes;
        let options: Palettes = {};
        let count = 0;
        Object.keys(palettes).forEach(key => {
          if (count < 2) {
            const palette = {[key]: palettes[key]}
            options = {
              ...options,
              ...palette
            };
            count++;
          }
        })
        data.push({
          title: this.formatDate(timestamp),
          view: <View style={{paddingBottom: 35}}>
            {Object.keys(options).map((key) => {
            const palette = options[key];
            return <Result
              key={key}
              description={palette.description}
              image={palette.image}
              link={palette.link}
              name={palette.name}
              price={palette.price}
            />})}
          </View>
        });
      }
    }
    return data;
  }

  public render() {
    const { navigate, results } = this.props;
    const resHistory = this.getResults();

    return (
      <Layout showHeader={true}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <Text style={styles.title}>
            Finder History
          </Text>
          {!!results ? <Accordion data={resHistory} /> :
            <Text style={StyleSheet.flatten([styles.copy, !results && {alignSelf: 'center'}])}>
              {content.historyEmptyMsg}
            </Text>
          }
          {!!results && <Button
            backgroundColor={colors.neonPink}
            onPress={this.handleClear}
            style={styles.clearButton}
            text={content.historyClearButton}
            textColor={colors.white}
          />}
          <View style={styles.buttons}>
            <Button
              backgroundColor={colors.neonPink}
              onPress={() => navigate('/Home')}
              style={styles.button}
              text={content.historyHomeButton}
              textColor={colors.white}
            />
            <Button
              backgroundColor={colors.neonPink}
              onPress={() => navigate('/Question/l1')}
              style={styles.button}
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
  buttons: {
    flexDirection: 'row'
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 30,
    width: 165
  },
  clearButton: {
    marginHorizontal: 5,
    marginTop: 40,
    marginBottom: 20,
    width: 165
  }
})
