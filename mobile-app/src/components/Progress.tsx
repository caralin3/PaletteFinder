import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface ProgressProps {
  count: number;
}

export const Progress: React.SFC<ProgressProps> = (props) => (
  <View>
    <Text>Progress</Text>
  </View>
);

const styles = StyleSheet.create({

});

