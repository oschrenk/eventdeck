import React from 'react';
import {Button, ImageBackground, SafeAreaView, View} from 'react-native';

import Card from '../components/Card';
import { useCardDeck } from "../contexts/CardDeckContext";
import IconButton from '../components/IconButton'

const HomeScreen = () => {
  const { currentCard, side, drawCard, flipCard, putBack, destroy } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <View style={{ height: 54, alignItems: 'center'}}>
          <IconButton name="draw" onPress={drawCard} style={{fontSize: 48}}/>
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
                       <IconButton name="remove-from-game" onPress={putBack} style={{fontSize: 48}}/>}
                     <IconButton name="flip" onPress={flipCard} style={{fontSize: 48}}/>
                     { side === 'back' &&
                       <IconButton name="return-to-deck" onPress={() => destroy(currentCard.id)} style={{fontSize: 48}}/>}
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
