import { push } from 'connected-react-router';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout } from '../components';
import { content, questions } from '../data';
import { Choice, Questions } from '../types';
import { addAnswer, updateScore } from '../store';

interface QuestionStateMappedProps {}

interface QuestionDispatchMappedProps {
  addAnswer: (id: string, choice: Choice) => void;
  navigate: (path: string) => void;
  updateScore: (score: number) => void;
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
  public readonly state: QuestionState = {
    selected: undefined,
    value: undefined,
  }

  private next = () => {
    const { match, navigate } = this.props;
    const id = match.params.id;
    const quest = (questions as Questions)[id];
    const type = quest.type.slice(0, 1);
    if (quest.number === 7) {
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
    if (choice) {
      addAnswer(match.params.id, choice);
      updateScore(choice.score);
      this.next();
    }
  }

  public render() {
    const { selected } = this.state;
    const { match } = this.props;
    const id = match.params.id;
    const quest = (questions as Questions)[id];
    const type = quest.type.slice(0, 1).toUpperCase() + quest.type.slice(1);
    const inputQuestion = id === 'l3' || id === 'p4';
    const ios = Platform.OS === 'ios';

    return (
      <Layout showHeader={true}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
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
                style={StyleSheet.flatten([styles.input, ios && {height: 50}])}
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
  navigate: (path: string) => dispatch(push(path)),
  updateScore: (score: number) => dispatch(updateScore(score))
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
    fontSize: 24,
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
  },
  image: {
    height: 300,
    width: 250,
  }
})
