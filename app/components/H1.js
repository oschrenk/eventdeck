import React from "react";
import { header } from '../styles/typography'

import {
  ImageBackground,
  Text
} from 'react-native';

const H1 = ({title}) => {
  return (
    <ImageBackground source={require('../../assets/images/h1.png')} style={{width: 188, height: 52}}>
      <Text style={{...header, marginTop: 6, marginLeft: 15}}>{title}</Text>
    </ImageBackground>
  )
}

export default H1
