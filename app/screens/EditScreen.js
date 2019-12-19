import React from "react";
import {ImageBackground, FlatList, SafeAreaView, Text, View} from 'react-native';

import Checkbox from 'react-native-modest-checkbox'
import { header } from '../styles/typography'


import { useCardDeck, allCityCardNumbers, allRoadCardNumbers } from "../contexts/CardDeckContext";
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

const EditScreen = ({navigation}) => {
  const { available, toggleAvailable } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>City, Base</Text>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <Column ids={allCityCardNumbers.slice(0,10)} checked={(item) => available.city.has(item)} toggle={(item) =>toggleAvailable(item, 'city')}/>
            <Column ids={allCityCardNumbers.slice(10,20)} checked={(item) => available.city.has(item)} toggle={(item) =>toggleAvailable(item, 'city')}/>
            <Column ids={allCityCardNumbers.slice(20,30)} checked={(item) => available.city.has(item)} toggle={(item) =>toggleAvailable(item, 'city')}/>
        </View>

        <Text style={header}>Road, Base</Text>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <Column ids={allRoadCardNumbers.slice(0,10)} checked={(item) => available.road.has(item)} toggle={(item) =>toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(10,20)} checked={(item) => available.road.has(item)} toggle={(item) =>toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(20,30)} checked={(item) => available.road.has(item)} toggle={(item) =>toggleAvailable(item, 'road')}/>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default EditScreen;
