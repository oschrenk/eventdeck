import React from "react";
import { FlatList, ImageBackground, SafeAreaView, Text, View } from 'react-native';

import { header } from '../styles/typography'

import { useCardDeck } from "../contexts/CardDeckContext"
import { CardIcon } from '../components/Icon'
import EnrichedText from '../components/EnrichedText'

import * as RNLocalize from "react-native-localize"

const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const formatDate = (t) => {
  const date = new Date(t)
  const options = {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: RNLocalize.getTimeZone(),
  }
  return new Intl.DateTimeFormat('de-DE', options).format(date)
}

const CardDrawn = ({event}) => {
  const {timestamp, data} = event
  const {id, type} = data
  return (
    <View style={{flexDirection: "row"}}>
      <View style={{width: 32, height: 32}}>
        <CardIcon name={'draw'} style={{fontSize: 32, color: "black" }} key={'draw'}/>
      </View>
      <View>
        <Text>{`${capitalize(type)} ${id} at ${formatDate(timestamp)}`}</Text>
      </View>
    </View>
  )
}

const Effect = ({text}) => {
  return (
    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
      <EnrichedText text={text}/>
    </View>
  )
}

const CardRemoved = ({event}) => {
  const {timestamp, data} = event
  const {id, type} = data
  return (
    <View style={{flexDirection: "row"}}>
      <View style={{width: 32, height: 32, alignItems: "center" }}>
        <CardIcon name={'remove-from-game'} style={{fontSize: 26, color: "black" }} />
      </View>
      <View>
        <Text>{`${capitalize(type)} ${id} at ${formatDate(timestamp)}`}</Text>
        { data.effects &&
          data.effects.map((e,i) =>
            <Effect text={e} key={i}/>
          )
        }
      </View>
    </View>
  )
}

const CardReturned = ({event}) => {
  const {timestamp, data} = event
  const {id, type} = data
  return (
    <View style={{flexDirection: "row"}}>
      <View style={{width: 32, height: 32, alignItems: "center" }}>
        <CardIcon name={'return-to-deck'} style={{fontSize: 26, color: "black" }} />
      </View>
      <View>
        <Text>{`${capitalize(type)} ${id} at ${formatDate(timestamp)}`}</Text>
        { data.effects &&
          data.effects.map((e,i) =>
            <Effect text={e} key={i}/>
          )
        }
      </View>
    </View>
  )
}

const Item = (item) => {

  const {name, timestamp} = item.item

  switch (name) {
    case 'CardDrawn':
      return (<CardDrawn event={item.item}/>)
    case 'CardRemoved':
      return (<CardRemoved event={item.item}/>)
    case 'CardReturned':
      return (<CardReturned event={item.item}/>)
  }

}

const HistoryScreen = () => {
  const { currentParty } = useCardDeck()
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Text style={header}>History</Text>
        <FlatList
         data={currentParty().history.filter(e => (e.name === 'CardRemoved') || (e.name === 'CardReturned'))}
         renderItem={({item}) => <Item item={item}></Item>}
         keyExtractor={item => item.timestamp.toString() }
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HistoryScreen;


