import React from "react";
import {ImageBackground, FlatList, SafeAreaView, Text, View} from 'react-native';

import Checkbox from 'react-native-modest-checkbox'
import { header } from '../styles/typography'


import { useCardDeck, allRoadCardNumbers } from "../contexts/CardDeckContext";
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

const RoadScreen = ({navigation}) => {
  const { isAvailable, toggleAvailable } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>Road, Base</Text>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <Column ids={allRoadCardNumbers.slice(0,6)} checked={(item) => isAvailable(item, 'road')} toggle={(item) => toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(6,12)} checked={(item) => isAvailable(item, 'road')} toggle={(item) => toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(12,18)} checked={(item) => isAvailable(item, 'road')} toggle={(item) =>toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(18,24)} checked={(item) => isAvailable(item, 'road')} toggle={(item) =>toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(24,30)} checked={(item) => isAvailable(item, 'road')} toggle={(item) =>toggleAvailable(item, 'road')}/>
        </View>

        <Text style={header}>Road, Expanded</Text>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <Column ids={allRoadCardNumbers.slice(30,36)} checked={(item) => isAvailable(item, 'road')} toggle={(item) => toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(36,42)} checked={(item) => isAvailable(item, 'road')} toggle={(item) => toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(42,45)} checked={(item) => isAvailable(item, 'road')} toggle={(item) => toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(30,30)} checked={(item) => isAvailable(item, 'road')} toggle={(item) => toggleAvailable(item, 'road')}/>
            <Column ids={allRoadCardNumbers.slice(30,30)} checked={(item) => isAvailable(item, 'road')} toggle={(item) => toggleAvailable(item, 'road')}/>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RoadScreen;
