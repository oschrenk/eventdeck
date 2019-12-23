import React from "react";
import {Button, FlatList, ImageBackground, SafeAreaView, Text, TextInput} from 'react-native';

import { header } from '../styles/typography'

import { useCardDeck } from "../contexts/CardDeckContext";

const PartyScreen = () => {
  const { newParty, parties } = useCardDeck()
  const [newPartyName, newPartyNameChange] = React.useState('Useless Placeholder');
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>Party</Text>
        <FlatList
         data={parties}
         renderItem={({item}) => <Text>{item.name}</Text>}
         keyExtractor={item => item.id}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => newPartyNameChange(text)}
          value={newPartyName}
        />
        <Button
          title="Add new party"
          onPress={() => { console.log(newPartyName); newParty(newPartyName); }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PartyScreen;
