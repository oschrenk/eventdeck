import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default ImageButton = ({source, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Image source={source} style={{...style}}/>
    </TouchableOpacity>)
}

