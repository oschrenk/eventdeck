import React, {useState} from 'react';
import {SafeAreaView, Button, ImageBackground} from 'react-native';

import Card from './app/components/Card';

const card1 = {
  id: "1",
  text: "Card 1",
  optionA: {
    choice: "1 Be nice",
    outcome: [{text: "1 Be lucky"}]
  },
  optionB: {
    choice: "1 Be naughty",
    outcome: [{text: "1 Be punished"}]
  }
}

const card2 = {
  id: "2",
  text: "Card 2",
  optionA: {
    choice: "2 Be nice",
    outcome: [{text: "2 Be lucky"}]
  },
  optionB: {
    choice: "2 Be naughty",
    outcome: [{text: "2 Be punished"}]
  }
}

const App: () => React$Node = () => {
  const [side, setSide] = useState('front');
  const [currentCard, setCard] = useState(card1)
  const flipCard = () => {
    if(side === 'front')
      setSide('back');
    else
      setSide('front');
  }
  const drawCard = () => {

    console.log("currentCard", currentCard)
    if(currentCard.id === "1") {
      console.log("if", currentCard)
      setCard(card2)
      setSide('front')
    } else {
      console.log("else", currentCard)
      setCard(card1)
      setSide('front')
    }
  }

  return (
    <>
      <ImageBackground source={require('./assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
        <SafeAreaView>
          <Button title="Draw" onPress={drawCard} />
          <Card card={currentCard} side={side} />
          <Button title="Flip" onPress={flipCard} />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default App;
