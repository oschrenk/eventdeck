import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyledIcon } from './Icon'

export default IconButton = ({name, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <StyledIcon name={name} style={style} />
    </TouchableOpacity>)
}

