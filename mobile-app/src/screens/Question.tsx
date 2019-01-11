import { push } from 'connected-react-router';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { colors } from '../appearance/styles';
import { Button, Layout } from '../components';
import { content, questions } from '../data';
import { Questions } from '../types';

interface QuestionStateMappedProps {}

interface QuestionDispatchMappedProps {
  navigate: (path: string) => any;
}

interface QuestionRouteParams {
  id: string;
}

interface QuestionProps extends
  RouteComponentProps<QuestionRouteParams>,
  QuestionStateMappedProps,
  QuestionDispatchMappedProps {}

export class DisconnectedQuestion extends React.Component<QuestionProps> {
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

  public render() {
    const { match } = this.props;
    const quest = (questions as Questions)[match.params.id];
    const type = quest.type.slice(0, 1).toUpperCase() + quest.type.slice(1);

    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.title}>
            {type === 'Preference' ? `Eyeshadow ${type}` : type} Question {quest.number}
          </Text>
          <Text style={styles.title}>{quest.prompt}</Text>
          <View>
            
          </View>
          <Button
            backgroundColor={colors.neonPink}
            onPress={this.next}
            style={styles.button}
            text={content.nextButton}
            textColor={colors.white}
          />
        </View>
      </Layout>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): QuestionDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const Question = connect(
  null,
  mapDispatchToProps
)(DisconnectedQuestion);

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
