import React from "react";
import {ImageBackground, SafeAreaView, Text} from 'react-native';

import { header } from '../styles/typography'

const SettingsScreen = ({navigation}) => {
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>Settings</Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SettingsScreen;
