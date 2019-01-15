import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { AccordionItem } from './AccordionItem';

export interface AccordionData {
  title: string;
  view: JSX.Element; 
}

interface AccordionProps {
  data: AccordionData[];
}

export const Accordion: React.SFC<AccordionProps> = (props) =>(
  <View style={styles.container}>
    {props.data.map(data => (
      <AccordionItem title={data.title} key={data.title}>
        {data.view}
      </AccordionItem>
    ))}
  </View>
);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 25
  },
});
