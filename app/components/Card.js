import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import Mustache from 'mustache'

import { backText, frontText, bold } from '../styles/typography'

const view = {
  Scoundrel: "SCOUNDREL",
  Mindthief: "MINDTHIEF",
  Eclipse: "ECLIPSE",
  Brute: "BRUTE",
  Cragheart: "CRAGHEART",
  LightningBolts: "LIGHTNINGbOLTS",
  Triangles: "TRIANGLES",
  Tinkerer: "TINKERER",
  Spellweaver: "SPELLWEAVER",
  PointyHead: "POINTYhEAD",
  Saw: "SAW",
  MusicNote: "MUSICnOTE",
  Check: "CHECK",
  Bless: "BLESS"
}

const Bold = ({text}) => {
  return (
    <Text style={bold}>{text}</Text>
  )
}

const enhance = (text) => {
  return Mustache.render(text, view);
}


const Front = (props) => {
  return (
    <View style={{width: 378, height: 530}}>
      <ImageBackground source={require('../../assets/images/city_front.png')} style={{width: '100%', height: '100%'}}>
        <View style={{left: 40, top: 80, width: 305, height: "80%"}}>
          <Text style={frontText}>{props.card.text}</Text>
        </View>
        <View style={{left: 40, width: 305, height: "16%"}}>
          <Text style={frontText}>
            <Bold text={'Option A'} /> {props.card.optionA.choice}
          </Text>
          <Text style={{...frontText, top: 12}}>
            <Bold text={'Option B'} /> {props.card.optionB.choice}
          </Text>
        </View>
        <View style={{height: "4%", width: "100%"}}>
          <Text style={{...frontText, textAlign: 'center'}}>{props.card.id}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const Back = (props) => {
  return (
    <View style={{width: 378, height: 530}}>
      <ImageBackground source={require('../../assets/images/city_back.png')} style={{width: '100%', height: '100%'}}>
        <View style={{left: 60, top: 20, width: 280, height: "50%"}}>
          <Text style={backText}>{enhance(props.card.optionA.outcome[0].text)}</Text>
        </View>
        <View style={{left: 60, top: 25, width: 280, height: "50%"}}>
          <Text style={backText}>{enhance(props.card.optionB.outcome[0].text)}</Text>
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
