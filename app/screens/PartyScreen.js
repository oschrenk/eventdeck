import React from "react";
import {Button, FlatList, ImageBackground, SafeAreaView, Text, TextInput, View} from 'react-native';

import { header, input, partyName } from '../styles/typography'

import { useCardDeck } from "../contexts/CardDeckContext";

const Party = ({party}) => {
  const { makeCurrent, isCurrent, renameParty, removeParty} = useCardDeck()
  const currentMarker = isCurrent(party.id) ? "*" : ""
  return (
    <View style={{marginTop: 20, padding: 10}}>
      <Text style={partyName}>{`${party.name} ${currentMarker}`}</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        <Button
          title="Select"
          onPress={() => { makeCurrent(party.id)}}
        />
        <Button
          title="Delete"
          onPress={() => { removeParty(party.id) }}
        />
      </View>
    </View>
  )
}

const PartyScreen = () => {
  const { newParty, parties } = useCardDeck()
  const [newPartyName, newPartyNameChange] = React.useState('');
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>Party</Text>
        <FlatList
         data={parties}
         renderItem={({item}) => <Party party={item}/>}
         keyExtractor={item => item.id}
        />
        <TextInput
          style={{ margin: 20, height: 40, borderWidth: 1, ...input }}
          placeholder={'Name'}
          placeholderTextColor={'gray'}
          onChangeText={text => newPartyNameChange(text)}
          value={newPartyName}
          selectionColor={'red'}
        />
        <Button
          title="Add new party"
          onPress={() => { newParty(newPartyName); newPartyNameChange(null) }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PartyScreen;
