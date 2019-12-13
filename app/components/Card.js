import React from 'react';
import { Button, Text, View, ImageBackground } from 'react-native';

const enhance = (text) => {
  return text;
}

const Front = (props) => {
  return (
    <View style={{width: 378, height: 530}}>
      <ImageBackground source={require('../../assets/images/city_front.png')} style={{width: '100%', height: '100%'}}>
        <View style={{left: 40, top: 80, width: 305, height: "80%"}}>
          <Text style={{color: 'white', fontFamily: 'Nyala', fontSize: 16 }}>{props.card.text}</Text>
        </View>
        <View style={{left: 40, width: 305, height: "16%"}}>
          <Text style={{color: 'white', fontFamily: 'Nyala', fontSize: 16 }}>
            <Text style={{fontWeight: "bold"}}>Option A:</Text> {props.card.optionA.choice}
          </Text>
          <Text style={{top: 12, color: 'white', fontFamily: 'Nyala', fontSize: 16 }}>
            <Text style={{fontWeight: "bold"}}>Option B:</Text> {props.card.optionB.choice}
          </Text>
        </View>
        <View style={{height: "4%", width: "100%"}}>
            <Text style={{color: 'white', fontFamily: 'Nyala', fontSize: 16, textAlign: 'center'}}>{props.card.id}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const Back = (props) => {
  return (
    <View style={{width: 378, height: 530}}>
      <ImageBackground source={require('../../assets/images/city_back.png')} style={{width: '100%', height: '100%'}}>
        <View style={{left: 60, top: 20, width: 305, height: "50%"}}>
          <Text style={{color: 'white', fontFamily: 'Nyala', fontSize: 18 }}>{enhance(props.card.optionA.outcome[0].text)}</Text>
        </View>
        <View style={{left: 60, top: 30, width: 305, height: "50%"}}>
          <Text style={{color: 'white', fontFamily: 'Nyala', fontSize: 18 }}>{enhance(props.card.optionB.outcome[0].text)}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default function Card(props) {
  if (props.side === 'front')
    return Front(props)
  else
    return Back(props)
}
