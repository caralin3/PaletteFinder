import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../appearance/styles';

export interface ProgressProps {
  count: number;
}

export class Progress extends React.Component<ProgressProps> {
  public render() {
    const { count } = this.props;
    const bars: JSX.Element[] = [];
    for (let i = 0; i < count; i++) {
      bars.push(
        <View style={styles.bar} key={i} />
      );
    }

    return (
      <View>
        {bars}
      </View>
    );
  }
}

export const Bar: React.SFC = () => (
  <View style={styles.bar} />
);

const styles = StyleSheet.create({
  bar: {
    borderBottomColor: colors.neonPink,
    borderBottomWidth: 1,
  }
});
