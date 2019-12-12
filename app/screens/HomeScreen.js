import React from 'react';
import {Button, ImageBackground, SafeAreaView, Text, View} from 'react-native';

import Card from '../components/Card';
import { useCardDeck } from "../contexts/CardDeckContext";

const HomeScreen = ({navigation}) => {
  const { currentCard, side, drawCard, flipCard, putBack, destroy } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Button title="Draw" onPress={drawCard} />
        { currentCard &&
          <>
            <Card card={currentCard} side={side} />
            <Button title="Flip" onPress={flipCard} />
            { side === 'back' &&
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', height: 30}}>
                  <Button style={{}} title="Put Back" onPress={putBack} />
                  <Button style={{}} title="Destroy" onPress={() => destroy(currentCard.id)} />
                </View>
              </View>
            }
          </>
        }
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
