import * as React from 'react';
import { Animated, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { textFonts, colors } from '../appearance';

interface AccordionItemProps {
  title: string;
}

interface AccordionItemState {
  animation: any;
  expanded: boolean;
  maxHeight: number;
  minHeight: number;
}

export class AccordionItem extends React.Component<AccordionItemProps, AccordionItemState> {
  public readonly state: AccordionItemState = {
    animation: new Animated.Value(50),
    expanded: false,
    maxHeight: 0,
    minHeight: 0,
  }

  private toggle = () => {
    const { animation, expanded, maxHeight, minHeight } = this.state;
    let initialValue = expanded ? maxHeight + minHeight : minHeight,
      finalValue = expanded ? minHeight : maxHeight + minHeight;

    this.setState({ expanded : !expanded });
    animation.setValue(initialValue);
    Animated.spring(animation, {toValue: finalValue}).start();
  }

  private _setMaxHeight = (event: any) => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  private _setMinHeight = (event: any) => {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  render() {
    const { animation, expanded } = this.state; 
    return ( 
      <Animated.View style={[styles.container, {height: animation}]}>
        <TouchableHighlight
          style={styles.button}
          onLayout={this._setMinHeight}
          onPress={this.toggle}
          underlayColor="#f1f1f1"
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
            <FontAwesomeIcon
              size={20}
              name={expanded ? 'caret-up' : 'caret-down'}
            />
          </View>
        </TouchableHighlight>
        <View style={styles.body} onLayout={this._setMaxHeight}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  titleContainer : {
    alignItems: 'center',
    backgroundColor: colors.palePurple,
    borderColor: colors.grapePurple,
    borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12
  },
  title: {
    color: colors.grapePurple,
    fontFamily: textFonts.primary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body: {
    marginHorizontal: 10,
    paddingBottom: 10
  }
});
