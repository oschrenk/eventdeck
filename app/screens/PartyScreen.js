import React, { useState } from "react";
import {Button, FlatList, ImageBackground, SafeAreaView, Text, TextInput, View} from 'react-native';

import { header, input, partyName } from '../styles/typography'

import { useCardDeck } from "../contexts/CardDeckContext";

const Party = ({party}) => {
  const {
    makeCurrent,
    isCurrent,
    renameParty,
    removeParty,
    isDefault
  } = useCardDeck()
  const [partyName, newPartyNameChange] = useState(party.name)
  const [isRenaming, toggleRenaming] = useState(false)

  const currentMarker = isCurrent(party.id) ? "*" : ""
  const renamingStyle = isRenaming ? { color: 'red'} : {}
  return (
    <View style={{marginTop: 20, padding: 10}}>

      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        <Text style={{ ...input, ...renamingStyle }}>{`${currentMarker} `}</Text>
        <TextInput
          style={{ height: 40, ...input, ...renamingStyle }}
          placeholder={'Name'}
          placeholderTextColor={'gray'}
          onChangeText={text => newPartyNameChange(text)}
          editable={isRenaming}
          value={partyName}
          selectionColor={'red'}
        />
      </View>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        { !isCurrent(party.id) &&
          <Button
            title="Select"
            onPress={() => { makeCurrent(party.id)}}
          /> }
        { !isDefault(party.id) &&
          <Button
            title="Delete"
            onPress={() => { removeParty(party.id) }}
          /> }
        <Button style={{renamingStyle}}
          title={isRenaming ? "Save" : "Rename" }
          onPress={() => {
            if (isRenaming) {
              renameParty(party.id, partyName)
            }
            toggleRenaming(!isRenaming)
          }}
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
