import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Button} from 'react-native';

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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Card content={card} side={side} />
        <Button title="Flip card" onPress={() => {
          if(side === 'front')
            setSide('back');
          else
            setSide('front');
        }} />
      </SafeAreaView>
    </>
  );
};

export default App;
