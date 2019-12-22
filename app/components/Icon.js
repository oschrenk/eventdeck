import React from 'react';
import { Text, View } from 'react-native';
import { icon } from '../styles/typography'

import { useCardDeck } from "../contexts/CardDeckContext";

const map= {
  // classes
  'brute': '\ue902',
  'circles': '\ue903',
  'cragheart': '\ue904',
  'cthulu': '\ue905',
  'eclipse': '\ue906',
  'lightning-bolts': '\ue907',
  'mindthief': '\ue908',
  'music-note': '\ue909',
  'pointy-head': '\ue90a',
  'saw': '\ue90b',
  'scoundrel': '\ue90c',
  'spellweaver': '\ue90d',
  'sun': '\ue90e',
  'three-spears': '\ue90f',
  'tinkerer': '\ue910',
  'triangles': '\ue911',
  'two-minis': '\ue912',

  // status
  'bless': [
    {'glyph': '\ue921', 'color': '#d6a529'},
    {'glyph': '\ue922', 'color': 'white'},
    {'glyph': '\ue923', 'color': 'white'},
    {'glyph': '\ue924', 'color': 'white'},
    {'glyph': '\ue925', 'color': 'white'},
  ],
  'check': '\ue915',
  'curse': [
    {'glyph': '\ue926', 'color': '#7d58a4'},
    {'glyph': '\ue927', 'color': 'white'},
    {'glyph': '\ue928', 'color': 'white'},
  ],
  'muddle': [
    {'glyph': '\ue93d', 'color': '#705844'},
    {'glyph': '\ue93e', 'color': 'white'},
    {'glyph': '\ue93f', 'color': 'white'},
  ],
  'poison': [
    {'glyph': '\ue943', 'color': '#7c7f67'},
    {'glyph': '\ue944', 'color': 'white'},
    {'glyph': '\ue945', 'color': 'white'},
    {'glyph': '\ue946', 'color': 'white'},
    {'glyph': '\ue947', 'color': 'white'},
  ],
  'wound': [
    {'glyph': '\ue95a', 'color': '#e46225'},
    {'glyph': '\ue95b', 'color': 'white'},
    {'glyph': '\ue95c', 'color': 'white'},
    {'glyph': '\ue95d', 'color': 'white'},
  ],

  // other
  '1-attack-modifier': [
    {'glyph': '\ue916', 'color': '#444'},
    {'glyph': '\ue917', 'color': '#e26969'},
  ],
  'small-item': '\ue919',
  'scenario': [
    {'glyph': '\ue918', 'color': '#000'},
    {'glyph': '\ue91a', 'color': '#fff'},
  ],

  // resolve
  'return-to-deck': '\ue900',
  'remove-from-game': '\ue901',

  // app
  'flip': '\ue913',
  'draw': '\ue914',
}

const SingleGlyph = ({glyph, style}) => {
  return <Text style={{...icon, ...style}}>{glyph}</Text>
}

const MultiGlyph = ({glyphs, style}) => {
  return (
   <View style={{flexDirection:'row', flexWrap:'wrap', width: 26}}>
    { glyphs.map((g,i) =>
       <Text style={{fontFamily: 'icomoon', fontSize:20, color: g.color, position: 'absolute', left: 3, top: 0}} key={i}>{g.glyph}</Text>)
    }
   </View>
  )
}

const ScenarioGlyph = ({number, glyphs, style}) => {
  return (
   <View style={{flexDirection:'row', flexWrap:'wrap', width: 26}}>
    { glyphs.map((g,i) =>
       <Text style={{fontFamily: 'icomoon', fontSize:20, color: g.color, position: 'absolute', left: 3, top: 0}} key={i}>{g.glyph}</Text>)
    }
    <Text style={{fontFamily: 'HighTowerText-Bold', fontSize:14, color: 'black', position: 'absolute', left: 7, top: 1}}>{number}</Text>
   </View>
  )
}

export const CardIcon = ({name, style}) => {
  const { currentCard } = useCardDeck()
  const extraStyle = (currentCard && currentCard.type == 'city') ? { color: 'white'} : {}
  return <SingleGlyph glyph={map[name]} style={{...style, ...extraStyle}} />
}

export const StyledIcon = ({name, style}) => {
  return <SingleGlyph glyph={map[name]} style={style} />
}

export default Icon = ({name}) => {
  const { currentCard } = useCardDeck()
  const extraStyle = (currentCard && currentCard.type == 'city') ? { color: 'white'} : {}

  if (typeof map[name] === 'string') {
    return <SingleGlyph glyph={map[name]} style={extraStyle}/>
  } else if (name.startsWith("scenario-")) {
    const [iconName, number] = name.split("-")
    return <ScenarioGlyph number={number} glyphs={map[iconName]} style={extraStyle} />
  } else if (Array.isArray(map[name])) {
    return <MultiGlyph glyphs={map[name]} />
  } else {
    return <Text>{"ERROR"}</Text>
  }
}

