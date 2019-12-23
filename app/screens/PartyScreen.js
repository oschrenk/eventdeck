import React from "react";
import {Button, FlatList, ImageBackground, SafeAreaView, Text, TextInput, View} from 'react-native';

import { header, input, partyName } from '../styles/typography'

import { useCardDeck } from "../contexts/CardDeckContext";

const PartyScreen = () => {
  const { newParty, parties } = useCardDeck()
  const [newPartyName, newPartyNameChange] = React.useState('');
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>Party</Text>
        <FlatList
         data={parties}
         renderItem={({item}) =>
           <View>
             <Text style={partyName}>{item.name}</Text>
           </View>
         }
         keyExtractor={item => item.id}
        />
        <TextInput
          style={{ height: 40, borderWidth: 1, ...input }}
          placeholder={'Name'}
          placeholderTextColor={'gray'}
          onChangeText={text => newPartyNameChange(text)}
          value={newPartyName}
          selectionColor={'red'}
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
