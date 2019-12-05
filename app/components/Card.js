import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

export default function Card(props) {
  if (props.side === 'front')
    return (
      <View style={{width: 378, height: 530}}>
        <ImageBackground source={require('../../assets/images/city_front.png')} style={{width: '100%', height: '100%'}}>
          <Text>{props.content.front.text}</Text>
          <Text>{props.content.front.optionA}</Text>
          <Text>{props.content.front.optionB}</Text>
        </ImageBackground>
      </View>
    );
  else
    return (
      <View style={{width: 378, height: 530}}>
        <ImageBackground source={require('../../assets/images/city_back.png')} style={{width: '100%', height: '100%'}}>
          <Text>{props.content.back.optionA}</Text>
          <Text>{props.content.back.optionB}</Text>
        </ImageBackground>
      </View>
    );

}
