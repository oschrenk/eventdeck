import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Button, ImageBackground} from 'react-native';

import Card from './app/components/Card';

const card = {
  front: {
    text: "Flavor",
    optionA: "Be nice",
    optionB: "Be naughty"
  },
  back: {
    optionA: "Be lucky",
    optionB: "Be punished"
  }
}

const App: () => React$Node = () => {
  const [side, setSide] = useState('front');
  return (
    <>
      <ImageBackground source={require('./assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
        <SafeAreaView>
          <Card content={card} side={side} />
          <Button title="Flip" onPress={() => {
            if(side === 'front')
              setSide('back');
            else
              setSide('front');
          }} />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default App;
