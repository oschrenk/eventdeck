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

const H1 = ({title}) => {
  return (
    <ImageBackground source={require('../../assets/images/h1.png')} style={{width: 188, height: 52}}>
      <Text style={{...header, marginTop: 6, marginLeft: 15}}>{title}</Text>
    </ImageBackground>
  )
}

const CityScreen = ({navigation}) => {
  const { isAvailable, toggleAvailable } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <ScrollView>
          <Header title={"City Events"} />
          <H1 title={"Base"} />
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
              <Column ids={allCityCardNumbers.slice(0,6)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(6,12)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(12,18)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(18,24)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(24,30)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
          </View>
          <H1 title={"Unlocks"} />
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
              <Column ids={allCityCardNumbers.slice(30,40)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(40,50)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(50,60)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(60,70)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(70,81)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
          </View>

          <H1 title={"Forgotten Circles"} />
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
              <Column ids={allCityCardNumbers.slice(81,82)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(82,84)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(84,86)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(86,88)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
              <Column ids={allCityCardNumbers.slice(88,90)} checked={(item) => isAvailable(item, 'city')} toggle={(item) =>toggleAvailable(item, 'city')}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CityScreen;
