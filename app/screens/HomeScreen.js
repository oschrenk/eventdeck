import React from 'react';
import {SafeAreaView, Button, ImageBackground} from 'react-native';

import Card from '../components/Card';
import { useCardDeck } from "../contexts/CardDeckContext";

const HomeScreen = ({navigation}) => {
  const { currentCard, side, drawCard, flipCard, putBack } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Button
          onPress={() => navigation.navigate('Edit')}
          title="Edit"
        />
        <Button title="Draw" onPress={drawCard} />
        { currentCard &&
          <>
            <Button title="Put back" onPress={putBack} />
            <Card card={currentCard} side={side} />
            <Button title="Flip" onPress={flipCard} />
          </>
        }
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
