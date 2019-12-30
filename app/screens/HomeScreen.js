import React from 'react';
import {ImageBackground, SafeAreaView, Text, View} from 'react-native';

import Card from '../components/Card';
import { useCardDeck } from "../contexts/CardDeckContext";
import IconButton from '../components/IconButton'
import ImageButton from '../components/ImageButton'
import { partyName } from '../styles/typography'

const HomeScreen = () => {
  const { currentCard, currentParty, side, drawCard, flipCard, putBack, destroy } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={{...partyName, textAlign: 'center'}}>{currentParty().name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 48}}>
          <ImageButton source={require('../../assets/images/city_button.png')} onPress={() => drawCard('city')} style={{ height: 40, resizeMode: 'center'}}/>
          <ImageButton source={require('../../assets/images/road_button.png')} onPress={() => drawCard('road')} style={{ height: 40, resizeMode: 'center'}}/>
        </View>
        { currentCard &&
          <>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={{ flexDirection: 'column', height: '100%'}}>
                <Card card={currentCard} side={side} />
                <View style={{ height: 48, alignItems: 'center'}}>
                </View>
                <View>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 48}}>
                     { side === 'back' &&
                       <IconButton name="remove-from-game" onPress={() => destroy(currentCard)} style={{fontSize: 48}}/>}
                     <IconButton name="flip" onPress={flipCard} style={{fontSize: 48}}/>
                     { side === 'back' &&
                       <IconButton name="return-to-deck" onPress={putBack} style={{fontSize: 48}}/>}
                   </View>
                </View>
              </View>
            </View>
          </>
        }
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
