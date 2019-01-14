import { push } from 'connected-react-router';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { colors, textFonts } from '../appearance';
import { Button, Layout, Result } from '../components';
import { content } from '../data';
import { Image } from '../types';

interface ResultHistoryStateMappedProps {}

interface ResultHistoryDispatchMappedProps {
  navigate: (path: string) => any;
}

interface ResultHistoryProps extends
  ResultHistoryStateMappedProps,
  ResultHistoryDispatchMappedProps {}

export class DisconnectedResultHistory extends React.Component<ResultHistoryProps> {
  private handleSave = () => {
    const { navigate } = this.props;
    navigate('/Home');
  }

  public render() {
    return (
    <Layout showHeader={true}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Text style={styles.copy}>{content.resultsMsg}</Text>
        <View style={styles.results}>
          <Result
            description="A palette with beautiful colors for girl on a budget."
            header="Option 1"
            image={{} as Image}
            link="ulta.com"
            name="Makeup Revolution Reloaded Palette Division"
            price={7}
          />
          <Result
            description="A palette with beautiful colors for girl on a budget."
            header="Option 2"
            image={{} as Image}
            link="sephora.com"
            name="Huda Beauty the New Nude Palette"
            price={6}
          />
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

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): ResultHistoryDispatchMappedProps => ({
  navigate: (path: string) => dispatch(push(path))
});

export const ResultHistory = connect(
  null,
  mapDispatchToProps
)(DisconnectedResultHistory);

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
