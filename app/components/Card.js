import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

export default function Card(props) {
  if (props.side === 'front')
    return (
      <View style={{width: 378, height: 530}}>
        <ImageBackground source={require('../../assets/images/city_front.png')} style={{width: '100%', height: '100%'}}>
          <Text style={{left: 40, top: 100, color: 'white', fontFamily: 'Nyala', fontSize: 18 }}>{props.card.text}</Text>
          <Text style={{left: 40, top: 400, color: 'white', fontFamily: 'Nyala', fontSize: 18 }}>Option A: {props.card.optionA.choice}</Text>
          <Text style={{left: 40, top: 420, color: 'white', fontFamily: 'Nyala', fontSize: 18 }}>Option B: {props.card.optionB.choice}</Text>
        </ImageBackground>
      </View>
    );
  else
    return (
      <View style={{width: 378, height: 530}}>
        <ImageBackground source={require('../../assets/images/city_back.png')} style={{width: '100%', height: '100%'}}>
          <Text style={{left: 60, top: 20, color: 'white', fontFamily: 'Nyala', fontSize: 18 }}>{props.card.optionA.outcome[0].text}</Text>
          <Text style={{left: 60, top: 280, color: 'white', fontFamily: 'Nyala', fontSize: 18 }}>{props.card.optionB.outcome[0].text}</Text>
        </ImageBackground>
      </View>
    );

}
