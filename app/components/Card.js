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
  LightningBolts: "LIGHTNINGBOLTS",
  Triangles: "TRIANGLES",
  Tinkerer: "TINKERER",
  Spellweaver: "SPELLWEAVER",
  PointyHead: "POINTYHEAD",
  Saw: "SAW",
  MusicNote: "MUSICNOTE",
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

const Outcome = ({outcome}) => {
  const requirement = outcome.requirement ? `${outcome.requirement}: ` : ""
  const text = outcome.text ? `${outcome.text}` : ""
  const effects = outcome.effects ? `${outcome.effects.join("\n")}` : ""
  const all = `${requirement}${text}\n${effects}`

  return (
    <Text style={backText}>{enhance(all)}</Text>
  )
}

const Outcomes = ({outcomes}) => {
  return outcomes.map(outcome => <Outcome outcome={outcome} />)
}

const Back = (props) => {
  return (
    <View style={{width: 378, height: 530}}>
      <ImageBackground source={require('../../assets/images/city_back.png')} style={{width: '100%', height: '100%'}}>
        <View style={{left: 60, top: 20, width: 280, height: "50%"}}>
          <Outcomes outcomes={props.card.optionA.outcomes} />
        </View>
        <View style={{left: 60, top: 25, width: 280, height: "50%"}}>
          <Outcomes outcomes={props.card.optionB.outcomes} />
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
