import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

import { backText, backTextEffect, frontText, bold } from '../styles/typography'
import Icon, { CardIcon } from './Icon'

const Lookup = {
  //classes
  "Brute": <Icon name={'brute'} key={'brute'}/>,
  "Circles": <Icon name={'circles'} key={'circles'}/>,
  "Cragheart": <Icon name={'cragheart'} key={'cragheart'}/>,
  "Cthulu": <Icon name={'cthulu'} key={'cthulu'}/>,
  "Eclipse": <Icon name={'eclipse'} key={'eclipse'}/>,
  "LightningBolts": <Icon name={'eclipse'} key={'eclipse'}/>,
  "Mindthief": <Icon name={'mindthief'} key={'mindthief'}/>,
  "MusicNote": <Icon name={'music-note'} key={'music-note'}/>,
  "PointyHead": <Icon name={'pointy-head'} key={'pointy-head'}/>,
  "Saw": <Icon name={'saw'} key={'saw'}/>,
  "Scoundrel": <Icon name={'scoundrel'} key={'scoundrel'}/>,
  "Spellweaver": <Icon name={'spellweaver'} key={'spellweaver'}/>,
  "Sun": <Icon name={'sun'} key={'sun'}/>,
  "ThreeSpears": <Icon name={'three-spears'} key={'three-spears'}/>,
  "Tinkerer": <Icon name={'tinkerer'} key={'tinkerer'}/>,
  "Triangles": <Icon name={'triangles'} key={'triangles'}/>,
  "TwoMinis": <Icon name={'two-minis'} key={'key-minis'}/>,

  // Status
  'Bless': <Icon name={'bless'} key={'bless'}/>,
  "Check": <Icon name={'check'} key={'check'}/>,
  'Curse': <Icon name={'curse'} key={'curse'}/>,
  'Muddle': <Icon name={'muddle'} key={'muddle'}/>,
  'Poison': <Icon name={'poison'} key={'poison'}/>,
  'Wound': <Icon name={'wound'} key={'wound'}/>,

  // Other
  'MinusOneAttackModifier': <Icon name={'1-attack-modifier'} key={'1-attack-modifier'}/>,
  'SmallItem': <Icon name={'small-item'} key={'small-item'}/>,

  // Resolves
  'Remove': <CardIcon name={'remove-from-game'} style={{fontSize: 32, textAlign: 'right' }} key={'remove-from-game'}/>,
  'Return': <CardIcon name={'return-to-deck'} style={{fontSize: 32, textAlign: 'right' }} key={'return-to-deck'}/>,
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

const RequirementBlock = ({requirement, text, color}) => {
  // 1. we can rely on requirements only to use mono-colored glyphs
  // 2. we can assume that the text after a a requirement is long
  // Because of 2., we can't use the View approach with flex:row and wrap
  // since the text element will be to big and will not wrap just only the
  // first line
  // but because of 1. we are sure that we only get text elements as icons
  // back and not view, so we can nest them in another Text element
  return (
    <Text>
      <TextParser text={requirement + ": " + text} style={{color:color}} />
    </Text>
  )
}

const Block = ({text, color}) => {
  return (
    <View>
      <Text style={{...backText, color: color}}>{text}</Text>
    </View>
  )
}

const Blocks = ({requirement, texts, color }) => {
  const start = requirement ? 1 : 0
  const end = texts.length

  return (
    <View style={{width: 290}}>
      { requirement &&
        <RequirementBlock requirement={requirement} text={texts[0]} color={color}/>
      }
      {
        texts.slice(start,end).map((t,i) => <Block text={t} color={color} key={i} />)
      }
    </View>
  )
}

const TextParser = ({text, style}) => {
  if (!text) {
    return null
  }
  const re = /\s*(\{\w+\})\s*/g;
  const split = text.split(re).filter(s => s !== "")

  return (
    split.map((s,i) => {
      if (s.startsWith("{")) {
        const name = s.substr(1, s.length - 2)
        const lookup = Lookup[name]
        if (name.startsWith("Scenario")) {
          const numberPattern = /\d+/g
          const match = name.match(numberPattern).map(Number)
          const number = parseInt(match.join([]))
          const iconName = 'scenario-' + number
          return <Icon name={iconName} key={i}/>
        } else if (!lookup) {
          console.warn("MISSING", name)
          return null
        } else {
          return lookup
        }
      } else {
        return <Text style={{...backText, ...style}} key={i}>{s}</Text>
      }
    })
  )
}

const Effect = ({text, color}) => {
  return (
    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
      <TextParser text={text} style={{...backTextEffect, color:color}}/>
    </View>
  )
}

const Outcome = ({outcome, type}) => {
  const requirement = outcome.requirement
  const effects = outcome.effects
  const texts = outcome.text.split("\n\n")
  const color = colors[type]

  return (
    <View>
      <Blocks requirement={requirement} texts={texts} color={color} />
      { (effects || outcome.resolve) &&
        <View style={{width: 315, flexDirection:'row', flexWrap:'wrap'}}>
          <View style={{width: 270, flexDirection:'column', justifyContent: 'flex-end'}}>
          { effects &&
            effects.map((e,i) => <Effect text={e} color={color} key={i} />)
          }
          </View>
          <View style={{height: 35,width: 40, position: 'absolute', left: 270, bottom: 0}}>
            <TextParser text={outcome.resolve} />
          </View>
        </View>
      }
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
        <View style={{left: 55, top: 20, width: 315, height: "50%"}}>
          <Outcomes outcomes={props.card.optionA.outcomes} type={props.card['type']} />
        </View>
        <View style={{left: 55, top: 30, width: 315, height: "50%"}}>
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
