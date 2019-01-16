import { push } from 'connected-react-router';
import * as React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout, Progress } from '../components';
import { content, questions } from '../data';
import { Choice, Questions, Palettes } from '../types';
import { addAnswer, updateScore, resetAnswers, resetScore, setPalettes } from '../store';
import { palettesRef } from '../firebase';
import { DataSnapshot } from 'react-native-firebase/database';
import { isIos } from '../utility/detect';

interface QuestionStateMappedProps {}

interface QuestionDispatchMappedProps {
  addAnswer: (id: string, choice: Choice) => void;
  resetAnswers: () => void;
  navigate: (path: string) => void;
  updateScore: (score: number) => void;
  resetScore: () => void;
  setPalettes: (palettes: Palettes) => void;
}

interface QuestionRouteParams {
  id: string;
}

interface QuestionProps extends
  RouteComponentProps<QuestionRouteParams>,
  QuestionStateMappedProps,
  QuestionDispatchMappedProps {}

interface QuestionState {
  selected: Choice | undefined;
  value: string | undefined;
}

export class DisconnectedQuestion extends React.Component<QuestionProps, QuestionState> {
  private scrollView: ScrollView | null = null;

  public readonly state: QuestionState = {
    selected: undefined,
    value: undefined,
  }

  public componentDidUpdate(prevProps: QuestionProps) {
    if (this.props.location !== prevProps.location) {
      if (this.scrollView) {
        this.scrollView.scrollTo({x: 0, y: 0, animated: false});
      }
    }
  }

  public componentDidMount() {
    const { match, resetAnswers, resetScore } = this.props;
    if (match.params.id === 'l1') {
      resetAnswers();
      resetScore();
    }
    if (match.params.id === 'l1') {
      this.loadPalettes();
    }
  }

  private loadPalettes = async () => {
    const { setPalettes } = this.props;
    let palettes: Palettes;
    await palettesRef.orderByChild('score').once('value', (snapshot: any) => (
      snapshot.forEach((child: DataSnapshot) => {
        const palette: Palettes = {[child.key as string]: child.val()}
        palettes = {
          ...palettes,
          ...palette
        }
        setPalettes(palettes);
      })
    ))
  }

  private next = () => {
    const { match, navigate } = this.props;
    const { selected } = this.state;
    const id = match.params.id;
    const quest = (questions as Questions)[id];
    const type = quest.type.slice(0, 1);
    if (quest.number === 7) {
      navigate(`/Continue`);
    } else if (quest.number === 6 && selected && selected.value !== 'No preference') {
      // Skip 7
      navigate(`/Continue`);
    } else if (id === 'p4') { 
      navigate(`/Results`);
    } else {
      navigate(`/Question/${type}${quest.number + 1}`);
    }
  }

  private handleNumberQuestions = (input: string) => {
    const { match } = this.props;
    const id = match.params.id;
    const value = parseInt(input, 10);
    const quest = (questions as Questions)[id];
    let score: number = 0;
    quest.choices.forEach(choice => {
      const range: string[] = choice.value.toString().split('-');
      const min: number = parseInt(range[0], 10);
      if (range.length === 2) {
        const max: number = parseInt(range[1], 10);
        if (value >= min && value <= max) {
          score = choice.score;
        }
      } else {
        if (value >= min) {
          score = choice.score;
        }
      }
    });
    const chosen: Choice = {
      score,
      value
    }
    return chosen;
  }

  private submit = () => {
    const { addAnswer, match, updateScore } = this.props;
    const { selected, value } = this.state;
    let choice: Choice | undefined;
    if (!!selected) {
      choice = selected;
      this.setState({ selected: undefined });
    } else if (!!value) {
      choice = this.handleNumberQuestions(value);
      this.setState({ value: undefined });
    }
    if (choice && this.scrollView) {
      addAnswer(match.params.id, choice);
      updateScore(choice.score);
      this.next();
    } else {
      Alert.alert('Invalid', 'This question is required.');
    }
  }

  public render() {
    const { selected } = this.state;
    const { match } = this.props;
    const id = match.params.id;
    const quest = (questions as Questions)[id];
    const type = quest.type.slice(0, 1).toUpperCase() + quest.type.slice(1);
    const inputQuestion = id === 'l3' || id === 'p4';

    return (
      <Layout showHeader={true}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container} ref={ref => this.scrollView = ref}>
          <Progress count={type === 'Lifestyle' ? 7 : 4} id={parseInt(id.slice(1))} />
          <Text style={styles.title}>
            {type} Question {quest.number}
          </Text>
          <Text style={styles.prompt}>{quest.prompt}</Text>
          <View style={styles.choices}>
            {inputQuestion ?
              <View style={styles.choices}>
              <TextInput
                maxLength={2}
                keyboardType="number-pad"
                onChangeText={(value) => this.setState({ value })}
                placeholder="13"
                returnKeyType="done"
                style={StyleSheet.flatten([styles.input, isIos() && {height: 50}])}
                value={this.state.value}
              />
              </View> :
              quest.choices.map((choice, i) => (
                <Button
                  key={i}
                  backgroundColor={
                    !!selected && selected.value === choice.value ?
                    colors.palePurple : colors.powderPink
                  }
                  onPress={() => this.setState({ selected: choice })}
                  style={styles.button}
                  text={choice.value.toString()}
                  textColor={
                    !!selected && selected.value === choice.value ?
                    colors.grapePurple : colors.neonPink
                  }
                />
            ))}
          </View>
          <Button
            backgroundColor={colors.neonPink}
            onPress={this.submit}
            style={styles.button}
            text={content.nextButton}
            textColor={colors.white}
          />
        </ScrollView>
      </Layout>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): QuestionDispatchMappedProps => ({
  addAnswer: (id: string, choice: Choice) => dispatch(addAnswer(id, choice)),
  resetAnswers: () => dispatch(resetAnswers()),
  navigate: (path: string) => dispatch(push(path)),
  updateScore: (score: number) => dispatch(updateScore(score)),
  resetScore: () => dispatch(resetScore()),
  setPalettes: (palettes: Palettes) => dispatch(setPalettes(palettes))
});

export const Question = connect(
  null,
  mapDispatchToProps
)(DisconnectedQuestion);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  choices: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontFamily: textFonts.primary,
    fontSize: 24,
    paddingLeft: 30,
    paddingVertical: 30
  },
  prompt: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontFamily: textFonts.primary,
    fontSize: 20,
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  button: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: colors.white,
    fontFamily: textFonts.primary,
    fontSize: 24,
    marginBottom: 100,
    marginTop: 50,
    textAlign: 'right',
    width: 300
  }
})
