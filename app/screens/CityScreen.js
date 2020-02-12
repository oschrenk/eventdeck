import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';

import Checkbox from 'react-native-modest-checkbox'
import Header from '../components/Header'
import H1 from '../components/H1'

import { useCardDeck, allCityCardNumbers } from "../contexts/CardDeckContext";
import { frontText } from '../styles/typography'

const CityScreen = () => {
  const { isAvailable, toggleAvailable } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <ScrollView>
          <Header title={"City Events"} />
          <H1 title={"Base"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allCityCardNumbers.slice(0,30).map(e =>
              <Checkbox
                label={e.toString()}
                checked={isAvailable(e, 'city')}
                labelStyle={{...frontText, width: 14}}
                onChange={(item) => toggleAvailable(item, 'city')}
              />
          )}
          </View>
          <H1 title={"Unlocks"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allCityCardNumbers.slice(30,81).map(e =>
              <Checkbox
                label={e.toString()}
                checked={isAvailable(e, 'city')}
                labelStyle={{...frontText, width: 14}}
                onChange={(item) => toggleAvailable(item, 'city')}
              />
          )}
          </View>

          <H1 title={"Forgotten Circles"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allCityCardNumbers.slice(81,90).map(e =>
              <Checkbox
                label={e.toString()}
                checked={isAvailable(e, 'city')}
                labelStyle={{...frontText, width: 14}}
                onChange={(item) => toggleAvailable(item, 'city')}
              />
          )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CityScreen;
