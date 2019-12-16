import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon'

export default IconButton = ({name, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Icon name={name} style={style} />
    </TouchableOpacity>)
}

