import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors } from '../appearance';

export interface ProgressProps {
  count: number;
  id: number;
}

export class Progress extends React.Component<ProgressProps> {
  public render() {
    const { count, id } = this.props;
    const bars: JSX.Element[] = [];
    const width = Dimensions.get('window').width / (count + 3);

    for (let i = 0; i < count; i++) {
      bars.push(
        <View style={StyleSheet.flatten([styles.bar,
          {borderBottomColor: i === (id - 1) ? colors.neonPink : colors.palePurple, width}])} key={i}>
          <Text style={styles.text}>-</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {bars}
      </View>
    );
  }
}

export const Bar: React.SFC = () => (
  <View style={styles.bar} />
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bar: {
    borderBottomWidth: 7,
    marginHorizontal: 5,
  },
  text: {
    color: colors.grapePurple
  }
});
