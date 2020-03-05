import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';

import EventCheckbox from '../components/EventCheckbox'
import Header from '../components/Header'
import H1 from '../components/H1'

import { allCityCardNumbers } from "../contexts/CardDeckContext";
import { frontText } from '../styles/typography'

const CityScreen = () => {
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <ScrollView>
          <Header title={"City Events"} />
          <H1 title={"Base"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allCityCardNumbers.slice(0,30).map((e, i) =>
              <EventCheckbox el={e} type={'city'} key={i} />
          )}
          </View>
          <H1 title={"Unlocks"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allCityCardNumbers.slice(30,81).map((e, i) =>
              <EventCheckbox el={e} type={'city'} key={i} />
          )}
          </View>

          <H1 title={"Forgotten Circles"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allCityCardNumbers.slice(81,90).map((e, i) =>
              <EventCheckbox el={e} type={'city'} key={i} />
          )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CityScreen;
