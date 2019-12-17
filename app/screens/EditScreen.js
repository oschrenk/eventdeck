import React from "react";
import {ImageBackground, FlatList, SafeAreaView} from 'react-native';
import Checkbox from 'react-native-modest-checkbox'

import { useCardDeck, allCityCardNumbers } from "../contexts/CardDeckContext";
import { frontText } from '../styles/typography'

const EditScreen = ({navigation}) => {
  const { available, toggleAvailable } = useCardDeck()

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <FlatList
          data={allCityCardNumbers}
          renderItem={({ item }) =>
            <Checkbox
              label={item.toString()}
              checked={available.city.has(item)}
              labelStyle={frontText}
              onChange={(item) => toggleAvailable(item, 'city')}
            />
          }
          keyExtractor={item => item.toString()}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default EditScreen;
