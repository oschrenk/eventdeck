import React from 'react';
import { Text, View } from 'react-native';

export default function Card(props) {
  if (props.side === 'front')
    return (
      <View>
        <Text>{props.content.front.text}</Text>
        <Text>{props.content.front.optionA}</Text>
        <Text>{props.content.front.optionB}</Text>
      </View>
    );
  else
    return (
      <View>
        <Text>{props.content.back.optionA}</Text>
        <Text>{props.content.back.optionB}</Text>
      </View>
    );

}
