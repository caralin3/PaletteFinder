import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataSnapshot } from 'react-native-firebase/database';
import { Layout } from '../components';
import { palettesRef } from '../firebase';
import { Palettes } from '../types';

interface HomeStateMappedProps {}

interface HomeDispatchMappedProps {}

interface HomeProps {}

interface HomeMergedProps extends
  HomeStateMappedProps,
  HomeDispatchMappedProps,
  HomeProps {}

interface HomeState {
  palette: Palettes;
}

export class Home extends React.Component<HomeMergedProps, HomeState> {
  public readonly state: HomeState = {
    palette: {} as Palettes,
  }

  public render() {
    palettesRef.orderByChild('score').startAt(30).once('value', (snapshot: any) => {
      snapshot.forEach((child: any) => {
        
        this.setState({ palette: child.val() });
      })
    });

    return (
      <Layout>
        <View style={styles.container}>
          <Text style={styles.text}>{JSON.stringify(this.state.palette)}</Text>
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontFamily: 'Karla-Regular'
  }
})
