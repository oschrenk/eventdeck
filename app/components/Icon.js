import React from 'react';
import { Text } from 'react-native';
import { icon } from '../styles/typography'

const map= {
  'return-to-deck': '\ue900',
  'remove-from-game': '\ue901',
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
  'two-minis': '\ue912'
}

export default Icon = ({name}) => {
  return <Text style={icon}>{map[name]}</Text>
}

