import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface SidebarProps {
  navigate: (path: string) => any;
  toggleDrawer: () => void;
}

export class Sidebar extends React.Component<SidebarProps> {
  private handlePress = (path: string) => {
    const { navigate, toggleDrawer } = this.props;
    toggleDrawer();
    navigate(path);
  };

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sidebar</Text>
        <TouchableOpacity onPress={() => this.handlePress('/Home')}>
          <Text style={styles.text}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handlePress('/2')}>
          <Text style={styles.text}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handlePress('/3')}>
          <Text style={styles.text}>3</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  text: {
    color: '#fff',
    padding: 10
  }
});