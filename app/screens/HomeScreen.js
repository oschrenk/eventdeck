import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View}
from 'react-native';
import CardFlip from 'react-native-card-flip'

import Card from '../components/Card'
import Header from '../components/Header'
import ImageButton from '../components/ImageButton'
import SwipeGesture from '../components/SwipeGesture'

import { useCardDeck } from "../contexts/CardDeckContext"

const swipe = (card) => (action) => {
  switch(action){
    case 'left':{
      card.flip()
      break;
    }
    case 'right':{
      card.flip()
      break;
    }
  }
}

const HomeScreen = () => {
  const { currentCard, currentParty, drawCard } = useCardDeck()
  const [cardRef, setCardRef] = useState(null)
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{height: '100%' }}>
          <View style={{height: 35 }}>
          </View>
          <Header title={currentParty().name} />
          <View style={{flex: 1, alignItems: 'center' }} >
          { currentCard &&
            <View style={{width: 378, height: 530, }} >
              <CardFlip style={styles.cardContainer} ref={card => (setCardRef(card))} >
                <SwipeGesture gestureStyle={styles.card} onSwipePerformed={swipe(cardRef)}>
                  <Card card={currentCard} side={'front'} />
                </SwipeGesture>
                <SwipeGesture gestureStyle={styles.card} onSwipePerformed={swipe(cardRef)}>
                  <Card card={currentCard} side={'back'} />
                </SwipeGesture>
              </CardFlip>
            </View>
          }
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <ImageButton source={require('../../assets/images/city-button.png')} onPress={() => drawCard('city')} style={{ height: 33, width: 139}}/>
              <ImageButton source={require('../../assets/images/road-button.png')} onPress={() => drawCard('road')} style={{ height: 33, width: 139 }}/>
            </View>
          </View>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card:{
    width: 378,
    height: 530,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity:0.5,
  },
});

export default HomeScreen;
