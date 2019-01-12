import { push } from 'connected-react-router';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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

}

export class DisconnectedQuestion extends React.Component<QuestionProps, QuestionState> {
  public readonly state: QuestionState = {
    selected: undefined
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

  private submit = () => {
    const { addAnswer, match, updateScore } = this.props;
    const { selected } = this.state;
    // if (!!selected) {
      // addAnswer(match.params.id, selected);
      // updateScore(selected.score)
      this.next();
    // }
  }

  public render() {
    const { selected } = this.state;
    const { match } = this.props;
    const quest = (questions as Questions)[match.params.id];
    const type = quest.type.slice(0, 1).toUpperCase() + quest.type.slice(1);

    return (
      <Layout showHeader={true}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <Text style={styles.title}>
            {type} Question {quest.number}
          </Text>
          <Text style={styles.prompt}>{quest.prompt}</Text>
          <View style={styles.choices}>
            {quest.choices.map((choice, i) => (
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
  image: {
    height: 300,
    width: 250,
  }
})
