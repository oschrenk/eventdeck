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


import { useCardDeck, allCityCardNumbers } from "../contexts/CardDeckContext";
import { frontText } from '../styles/typography'

const Column = ({ids, checked, toggle}) => {
  return (
    <View style={{width: 80 }}>
      <FlatList
        data={ids}
        renderItem={({ item }) =>
          <Checkbox
            label={item.toString()}
            checked={checked(item)}
            labelStyle={frontText}
            onChange={(item) => toggle(item)}
          />
        }
        keyExtractor={item => item.toString()}
      />
    </View>
  )
}

const CityScreen = ({navigation}) => {
  const { isAvailable, toggleAvailable } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <ScrollView>
          <Text style={header}>City, Base</Text>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
              <Column ids={allCityCardNumbers.slice(0,6)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(6,12)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(12,18)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(18,24)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(24,30)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
          </View>

          <Text style={header}>City, Expanded</Text>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
              <Column ids={allCityCardNumbers.slice(30,40)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(40,50)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(50,60)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(60,70)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(70,81)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
          </View>

          <Text style={header}>City, Forgotten Circles</Text>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
              <Column ids={allCityCardNumbers.slice(81,82)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(82,83)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(83,85)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(85,87)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(87,89)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CityScreen;
