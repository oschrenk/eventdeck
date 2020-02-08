import React from 'react';

import { Text } from 'react-native';

import Icon, { StyledIcon } from './Icon'

import { backText } from '../styles/typography'

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
  'Disarm': <Icon name={'disarm'} key={'disarm'}/>,
  'Immobilize': <Icon name={'immobilize'} key={'immobilize'}/>,
  'Muddle': <Icon name={'muddle'} key={'muddle'}/>,
  'Poison': <Icon name={'poison'} key={'poison'}/>,
  'Strengthen': <Icon name={'strengthen'} key={'strengthen'}/>,
  'Wound': <Icon name={'wound'} key={'wound'}/>,

  // Other
  'MinusOneAttackModifier': <Icon name={'1-attack-modifier'} key={'1-attack-modifier'}/>,
  'PlusOneEnhancement': <Icon name={'plus-one-enhancement'} key={'plus-one-enhancement'}/>,
  'SmallItem': <Icon name={'small-item'} key={'small-item'}/>,
  'Checkbox': <Icon name={'checkbox'} key={'checkbox'}/>,

  // Resolves
  'Remove': <StyledIcon name={'remove-from-game'} style={{fontSize: 18, color: 'white' }} key={'remove-from-game'}/>,
}

const KeywordRegex = /\s*(\{\w+\})\s*/g;
const splitKeywords = (text) => {
  return text.split(KeywordRegex).filter(s => s !== "")
}

export default EnrichedText = ({text, style}) => {
  if (!text) {
    return null
  }
  const split = splitKeywords(text)
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
        } else if (name.startsWith("Rune")) {
          const rune = name.slice(-1)
          const iconName = 'rune-' + rune
          return <Icon name={iconName} key={i}/>
        } else if (!lookup) {
          console.warn("MISSING", name)
          return null
        } else {
          return Lookup[name]
        }
      } else {
        return <Text style={{...backText, ...style}} key={i}>{s}</Text>
      }
    })
  )
}
