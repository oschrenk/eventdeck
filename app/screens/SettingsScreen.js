import React from "react";
import {Button, ImageBackground, SafeAreaView, Text} from 'react-native';

import { header } from '../styles/typography'
import { useCardDeck } from "../contexts/CardDeckContext";

const SettingsScreen = () => {
  const { reset } = useCardDeck()
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>Settings</Text>
        <Button
          title="Reset state"
          onPress={() => reset()}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SettingsScreen;
