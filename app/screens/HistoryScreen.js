import React from "react";
import {
  FlatList,
  SectionList,
  ImageBackground,
  SafeAreaView,
  Text,
  View
} from 'react-native';

import formatISO from 'date-fns/formatISO'

import { useCardDeck } from "../contexts/CardDeckContext"
import Header from '../components/Header'
import H1 from '../components/H1'
import { CardIcon } from '../components/Icon'
import EnrichedText from '../components/EnrichedText'

const formatDate = (t) => {
  const date = new Date(t)
  return formatISO(date, { representation: 'date' })
}

const Effect = ({text}) => {
  return (
    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
      <EnrichedText text={text} style={{fontFamily: 'Crimson-Bold', fontSize: 16}}/>
    </View>
  )
}

const resolveIcon = (eventName) => {
  if (eventName === 'CardReturned') {
    return (<CardIcon name={'return-to-deck'} style={{fontSize: 26, color: "black" }} /> )
  } else if (eventName === 'CardRemoved') {
    return (<CardIcon name={'remove-from-game'} style={{fontSize: 26, color: "black" }} /> )
  }
  return null
}

const Event = ({value}) => {
  const {name, data} = value
  const {id, type, option, effects} = data
  const cardIcon = (type === 'city') ? require('../../assets/images/city-icon.png') : require('../../assets/images/road-icon.png')
  const color = (type === 'city') ? 'white' : 'black'
  return (
    <View style={{flexDirection: "row", marginLeft: 15, marginRight: 15, marginBottom: 10}}>
      <View>
        <ImageBackground source={cardIcon} style={{width: 34, height: 48, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontFamily: 'Pirata One', fontSize: 18,lineHeight: 20, color: color, marginTop: 8}}>{`${id}\n\n${option.slice(-1)}`}</Text>
        </ImageBackground>
      </View>
      <View style={{marginLeft: 5}}>
      { effects &&
        effects.map((e,i) =>
          <Effect text={e} key={i}/>
        )
      }
      </View>
      <View>
      {
        resolveIcon(name)
      }
      </View>
    </View>

  )
}

const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
const groupedEvents = (history) => {
  const data = history.filter(e => (e.name === 'CardRemoved') || (e.name === 'CardReturned'))
  const grouped = groupBy(data, event => formatDate(event.timestamp))
  const iter = grouped.entries()
  var entries = []
  let result = iter.next();
  while (!result.done) {
    const [k,v] = result.value
    entries.push({title: k, data: v})
    result = iter.next();
  }
  return entries
}

const HistoryScreen = () => {
  const { currentParty } = useCardDeck()
  const data = groupedEvents(currentParty().history)
  return (
    <ImageBackground source={require('../../assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <Header title={"History"} />
        <SectionList
          sections={data}
          keyExtractor={item => item.timestamp}
          renderItem={({ item }) => <Event value={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <H1 title={title} />
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HistoryScreen;
