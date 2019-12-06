import React, {useState} from 'react';
import {SafeAreaView, Button, ImageBackground} from 'react-native';

import Card from './app/components/Card';

const card = {
  text: "Flavor",
  optionA: {
    choice: "Be nice",
    outcome: [{text: "Be lucky"}]
  },
  optionB: {
    choice: "Be naughty",
    outcome: [{text: "Be punished"}]
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

  return (
    <>
      <ImageBackground source={require('./assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
        <SafeAreaView>
          <Card card={currentCard} side={side} />
          <Button title="Flip" onPress={flipCard} />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default App;
