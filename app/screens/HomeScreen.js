import React, {useState} from 'react';
import {SafeAreaView, Button, ImageBackground} from 'react-native';

import Card from '../components/Card';
import defaultData from '../data/events.json'

const cards = defaultData

const HomeScreen: () => React$Node = () => {
  const [side, setSide] = useState('front');
  const [currentCard, setCard] = useState(null)
  const flipCard = () => {
    if(side === 'front')
      setSide('back');
    else
      setSide('front');
  }
  const drawCard = () => {
    const newCardId = Math.floor((Math.random() * cards.length) + 1);
    const newCard = cards.find(c => c.id === newCardId)
    setCard(newCard)
    setSide('front')
  }
  const putBack = () => {
    setCard(null)
    setSide('front')
  }

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
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
