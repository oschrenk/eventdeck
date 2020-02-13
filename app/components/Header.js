import React from 'react';
import {
  Text,
  TouchableOpacity,
  View}
from 'react-native';

import {
  DrawerActions,
  useNavigation
} from '@react-navigation/native'

import { CardIcon } from '../components/Icon'
import { partyName } from '../styles/typography'

export default Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"}}>
      <View style={{width: 32, marginLeft: 15, flexDirection: 'column', alignItems: "center"}}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <CardIcon name={'burger'} style={{fontSize: 26, color: "black" }}/>
        </TouchableOpacity>
      </View>
      <Text style={{...partyName, textAlign: 'center'}}>{title}</Text>
      <View style={{width: 32, marginRight: 15}} />
    </View>
  )
}

