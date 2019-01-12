import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { colors, textFonts } from '../appearance';
import { content } from '../data';

interface HeaderStateMappedProps {}

interface HeaderDispatchMappedProps {}

interface HeaderProps {
  // toggleDrawer: () => void;
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
      {/* <FontAwesomeIcon
        size={24}
        style={styles.bars}
        name="bars"
        onPress={this.props.toggleDrawer}
      /> */}
        <Text style={styles.title}>{content.header}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.neonPink,
    flexDirection: 'row',
    height: 75,
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  title: {
    color: colors.white,
    fontFamily: textFonts.header,
    fontSize: 24
  }
  // bars: {
  //   color: '#fff',
  //   flex: 1,
  //   padding: 10
  // },
})
