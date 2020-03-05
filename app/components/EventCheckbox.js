import React from "react";

import {
  View
} from 'react-native';
import Checkbox from 'react-native-modest-checkbox'

import { frontText } from '../styles/typography'
import { useCardDeck} from "../contexts/CardDeckContext";

const EventCheckbox = ({el, type}) => {
  const { isAvailable, toggleAvailable } = useCardDeck()
  return (
    <View style={{flexBasis: "20%", flexGrow: 0, flexShrink: 0}}>
      <Checkbox
        label={el.toString()}
        checked={isAvailable(el, type)}
        labelStyle={{...frontText}}
        onChange={(item) => toggleAvailable(item, type)}
      />
    </View>
  )
}

export default EventCheckbox
