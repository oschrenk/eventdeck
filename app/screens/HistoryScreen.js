import React from "react";
import { FlatList, ImageBackground, SafeAreaView, Text, } from 'react-native';

import { header } from '../styles/typography'

import { useCardDeck } from "../contexts/CardDeckContext";

const Item = (item) => {
  const {name, timestamp, card} = item.item
  return (
    <Text>{`${name} ${card.type}: ${card.id} at ${timestamp}`}</Text>
  )
}

const HistoryScreen = () => {
  const { currentParty } = useCardDeck()
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>History</Text>
        <FlatList
         data={currentParty().history}
         renderItem={({item}) => <Item item={item}></Item>}
         keyExtractor={item => item.timestamp }
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HistoryScreen;


