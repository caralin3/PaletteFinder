import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '../components';

interface HomeStateMappedProps {}

interface HomeDispatchMappedProps {}

interface HomeProps {}

interface HomeMergedProps extends
  HomeStateMappedProps,
  HomeDispatchMappedProps,
  HomeProps {}

interface HomeState {}

export class Home extends React.Component<HomeMergedProps, HomeState> {
  public readonly state: HomeState = {}

  public render() {
    return (
      <Layout>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
