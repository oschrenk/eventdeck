import React from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';

import Checkbox from 'react-native-modest-checkbox'
import { header } from '../styles/typography'
import Header from '../components/Header'


import { useCardDeck, allCityCardNumbers } from "../contexts/CardDeckContext";
import { frontText } from '../styles/typography'

const H1 = ({title}) => {
  return (
    <ImageBackground source={require('../../assets/images/h1.png')} style={{width: 188, height: 52}}>
      <Text style={{...header, marginTop: 6, marginLeft: 15}}>{title}</Text>
    </ImageBackground>
  )
}

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
