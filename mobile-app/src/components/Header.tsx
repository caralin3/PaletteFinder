import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface HeaderStateMappedProps {}

interface HeaderDispatchMappedProps {}

interface HeaderProps {
  toggleDrawer: () => void;
}

interface HeaderMergedProps extends
  HeaderStateMappedProps,
  HeaderDispatchMappedProps,
  HeaderProps {}

interface HeaderState {}

export class Header extends React.Component<HeaderMergedProps, HeaderState> {
  public readonly state: HeaderState = {}

  public render() {
    return (
      <View style={styles.container}>
      <FontAwesomeIcon
        size={24}
        style={styles.bars}
        name="bars"
        onPress={this.props.toggleDrawer}
      />
        <Text>Header</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flexDirection: 'row',
    height: 50,
    // justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  bars: {
    color: '#fff',
    flex: 1,
    padding: 10
  },
})
