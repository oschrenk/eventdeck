import React from "react";
import { FlatList, ImageBackground, SafeAreaView, Text, } from 'react-native';

import { header } from '../styles/typography'

import { useCardDeck } from "../contexts/CardDeckContext";

const Item = ({item}) => {
  return (
    <Text>{`Drew ${item.type}: ${item.id}`}</Text>
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
         keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HistoryScreen;


