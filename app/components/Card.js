import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import Mustache from 'mustache'

import { backText, frontText, bold } from '../styles/typography'
import Icon from './Icon'
import JsxParser from 'react-jsx-parser'

const view = {
  Scoundrel: "<Icon name={'scoundrel'}/>",
  Mindthief: "<Icon name={'mindthief'}/>",
  Eclipse: "<Icon name={'eclipse'}/>",
  Brute: "<Icon name={'brute'}/>",
  Cragheart: "<Icon name={'cragheart'}/>",
  LightningBolts: "<Icon name={'eclipse'}/>",
  Triangles: "<Icon name={'triangles'}/>",
  Tinkerer: "<Icon name={'tinkerer'}/>",
  Spellweaver: "<Icon name={'spellweaver'}/>",
  PointyHead: "<Icon name={'pointy-head'}/>",
  Saw: "<Icon name={'saw'}/>",
  MusicNote: "<Icon name={'music-note'}/>",
  Circles: "<Icon name={'circles'}/>",
  Check: "<Icon name={'check'}/>",
  Bless: "<Icon name={'bless'}/>",
  Less: "{<Text>{'<'}</Text>}",
  More: "{<Text>{'>'}</Text>}",
  Remove: "<Icon name={'remove-from-game'} style={{fontSize: 32, textAlign: 'right' }}/>",
  Return: "<Icon name={'return-to-deck'} style={{fontSize: 32, textAlign: 'right' }}/>",
}

const backgrounds = {
  city: {
    back: require('../../assets/images/city_back.png'),
    front: require('../../assets/images/city_front.png')
  },
  road: {
    back: require('../../assets/images/road_back.png'),
    front: require('../../assets/images/road_front.png')
  }
}

const Bold = ({text}) => {
  return (
    <Text style={bold}>{text}</Text>
  )
}
const enhance = (text) => {
  return Mustache.render(text, view)
}

const Front = (props) => {
  const color = colors[props.card['type']]
  return (
    <View style={{width: 378, height: 530}}>
      <ImageBackground source={backgrounds[props.card['type']]['front']} style={{width: '100%', height: '100%'}}>
        <View style={{left: 40, top: 80, width: 305, height: "80%"}}>
          <Text style={{...frontText, color: color}}>{props.card.text}</Text>
        </View>
        <View style={{left: 40, width: 305, height: "16%"}}>
          <Text style={{...frontText, color: color}}>
            <Bold text={'Option A'} /> {props.card.optionA.choice}
          </Text>
          <Text style={{...frontText, color: color, top: 12}}>
            <Bold text={'Option B'} /> {props.card.optionB.choice}
          </Text>
        </View>
        <View style={{height: "4%", width: "100%"}}>
          <Text style={{...frontText, color: color, textAlign: 'center'}}>{props.card.id}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const colors = {
  city: 'white',
  road: 'black'
}

const Outcome = ({outcome, type}) => {
  const requirement = outcome.requirement ? `${outcome.requirement}: ` : ""
  const text = outcome.text ? `${outcome.text}` : ""
  const effects = outcome.effects ? `${outcome.effects.join("\n")}` : ""
  const all = `${requirement}${text}\n${effects}`

  const color = colors[type]
  return (
    <View>
      <Text style={{...backText, color: color}}>
        <JsxParser
          components={{ Icon, Text }}
          jsx={enhance(all)}
          renderInWrapper={false}
        />
      </Text>
      <Text style={{...backText, color: color}}>
        <JsxParser
          components={{ Icon, Text }}
          jsx={enhance(outcome.resolve)}
          renderInWrapper={false}
          onError={(o) => console.log(o)}
        />
      </Text>
    </View>
  )
}

const Outcomes = ({outcomes, type}) => {
  return outcomes.map((outcome, index) => <Outcome outcome={outcome} type={type} key={index} />)
}

const Back = (props) => {
  return (
    <View style={{width: 378, height: 530}}>
      <ImageBackground source={backgrounds[props.card['type']]['back']} style={{width: '100%', height: '100%'}}>
        <View style={{left: 60, top: 20, width: 280, height: "50%"}}>
          <Outcomes outcomes={props.card.optionA.outcomes} type={props.card['type']} />
        </View>
        <View style={{left: 60, top: 25, width: 280, height: "50%"}}>
          <Outcomes outcomes={props.card.optionB.outcomes} type={props.card['type']} />
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
