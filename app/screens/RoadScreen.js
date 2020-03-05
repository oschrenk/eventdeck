import React from "react";

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';

import EventCheckbox from '../components/EventCheckbox'
import H1 from '../components/H1'
import Header from '../components/Header'

import { allRoadCardNumbers } from "../contexts/CardDeckContext";
const RoadScreen = () => {
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <ScrollView>
          <Header title={"Road Events"} />
          <H1 title={"Base"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allRoadCardNumbers.slice(0,30).map((e, i) =>
              <EventCheckbox el={e} type={'road'} key={i} />
          )}
          </View>

          <H1 title={"Unlocks"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allRoadCardNumbers.slice(30,69).map((e, i) =>
              <EventCheckbox el={e} type={'road'} key={i} />
          )}
          </View>

          <H1 title={"Forgotten Circles"} />
          <View style={{marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          {
            allRoadCardNumbers.slice(69,71).map((e, i) =>
              <EventCheckbox el={e} type={'road'} key={i} />
          )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RoadScreen;
