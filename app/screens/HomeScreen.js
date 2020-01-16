import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View}
from 'react-native';
import CardFlip from 'react-native-card-flip'

import Card from '../components/Card'
import { useCardDeck } from "../contexts/CardDeckContext"
import ImageButton from '../components/ImageButton'
import { partyName } from '../styles/typography'
import SwipeGesture from '../components/SwipeGesture'

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
  const { currentCard, currentParty, drawCard, flipCard, putBack, destroy } = useCardDeck()
  const [cardRef, setCardRef] = useState(null)

  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={{...partyName, textAlign: 'center'}}>{currentParty().name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 48}}>
          <ImageButton source={require('../../assets/images/city_button.png')} onPress={() => drawCard('city')} style={{ height: 40, resizeMode: 'center'}}/>
          <ImageButton source={require('../../assets/images/road_button.png')} onPress={() => drawCard('road')} style={{ height: 40, resizeMode: 'center'}}/>
        </View>
        { currentCard &&
          <>
            <View style={{flex: 1, alignItems: 'center' }} >
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
            </View>
          </>
        }
      </SafeAreaView>
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
