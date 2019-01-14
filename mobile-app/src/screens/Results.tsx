import { push } from 'connected-react-router';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout, Result } from '../components';
import { content } from '../data';
import { ApplicationState } from '../store';
import { Palettes } from '../types';

interface ResultsStateMappedProps {
  palettes: Palettes | undefined;
  score: number;
}

interface ResultsDispatchMappedProps {
  navigate: (path: string) => any;
}

interface ResultsProps extends
  ResultsStateMappedProps,
  ResultsDispatchMappedProps {}

interface ResultsState {
  results: Palettes | undefined;
}

export class DisconnectedResults extends React.Component<ResultsProps, ResultsState> {
  public readonly state: ResultsState = {
    results: undefined
  }

  public componentDidMount() {
    this.loadResults();
  }

  private loadResults = async () => {
    const { palettes, score } = this.props;
    if (palettes) {
      let results: Palettes = {};
      let count = 0;
      Object.keys(palettes).forEach((key) => {
        if (palettes[key].score >= score && count < 2) {
          const palette = {[key]: palettes[key]}
          results = {
            ...results,
            ...palette
          };
          count++;
        }
      })
      this.setState({
        results
      });
    }
    // TODO: Handle no palettes
  }

  private handleSave = () => {
    const { navigate } = this.props;
    // TODO: Save result with timestamp to store
    navigate('/Home');
  }

  public render() {
    const { results } = this.state;

    return (
      <Layout showHeader={true}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <Text style={styles.copy}>{content.resultsMsg}</Text>
          <View style={styles.results}>
          {!!results ? Object.keys(results).map((key, i) => {
            const palette = results[key];
            return <Result
              key={key}
              description={palette.description}
              header={`Option ${i + 1}`}
              image={palette.image}
              link={palette.link}
              name={palette.name}
              price={palette.price}
            />
          }) : <Text style={styles.copy}>No results</Text>}
          </View>
          <View style={styles.buttons}>
            <Button
              backgroundColor={colors.neonPink}
              onPress={this.handleSave}
              style={styles.button}
              text={content.resultsSaveButton}
              textColor={colors.white}
            />
            <Button
              backgroundColor={colors.neonPink}
              onPress={() => this.props.navigate('/Question/l1')}
              style={styles.button}
              text={content.resultsResetButton}
              textColor={colors.white}
            />
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

const mapStateToProps = (state: ApplicationState): ResultsStateMappedProps => ({
  palettes: state.palettes.palettes,
  score: state.score.score
})

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): ResultsDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const Results = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedResults);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  copy: {
    color: colors.white,
    fontFamily: textFonts.primary,
    fontSize: 22,
    paddingHorizontal: 40,
    paddingVertical: 20,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 30,
    width: 165
  },
  results: {
    flex: 1,
    marginHorizontal: 25,
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  }
})
