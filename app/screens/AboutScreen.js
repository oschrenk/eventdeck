import React from "react";
import {ImageBackground, SafeAreaView, Text} from 'react-native';

import { header } from '../styles/typography'

const AboutScreen = () => {
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>About</Text>
        <Text>All Gloomhaven images and content are trademarks and copyrights of Cephalofair Games®</Text>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default AboutScreen;
