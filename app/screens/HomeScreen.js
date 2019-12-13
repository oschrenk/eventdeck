import React from 'react';
import {Button, ImageBackground, SafeAreaView, View} from 'react-native';

import Card from '../components/Card';
import { useCardDeck } from "../contexts/CardDeckContext";

const HomeScreen = () => {
  const { currentCard, side, drawCard, flipCard, putBack, destroy } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Button title="Draw" onPress={drawCard} />
        { currentCard &&
          <>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={{ flexDirection: 'column', height: '100%'}}>
                <Card card={currentCard} side={side} />
                <View style={{ height: 30}}>
                  <Button title="Flip" onPress={flipCard} />
                </View>
               { side === 'back' &&
                <View style={{alignItems: 'center'}}>
                   <View style={{ flexDirection: 'row', height: 30}}>
                     <Button style={{}} title="Put Back" onPress={putBack} />
                     <Button style={{}} title="Destroy" onPress={() => destroy(currentCard.id)} />
                   </View>
                </View>
               }
              </View>
            </View>
          </>
        }
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
