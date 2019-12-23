import React, { useContext, useState, useEffect, useRef } from "react";
import AsyncStorage from '@react-native-community/async-storage'

import allCityEvents from '../data/city.json'
import allRoadEvents from '../data/road.json'

const CardDeckContext = React.createContext([{}, () => {}]);

const allCityCardNumbers = allCityEvents.map(e => e.id)
const allRoadCardNumbers = allRoadEvents.map(e => e.id)

const KEY = '@dev.oschrenk.eventdeck/v1a'
const defaultSide = 'back'

const AllCardsAvailable = {
  city: allCityCardNumbers,
  road: allRoadCardNumbers
}

const CardDeckProvider = (props) => {
  const [initialState, setState] = useState({
    side: defaultSide,
    history: [],
    currentCard: null,
    cards: allCityEvents.concat(allRoadEvents),
    available:  AllCardsAvailable,
    parties: []
  });

  async function pullFromStorage() {
    const fromStorage = await AsyncStorage.getItem(KEY)
    let value = {}
    if (fromStorage) {
      value = JSON.parse(fromStorage)
    }
    setState(state => ({ ...state, available: value }));
  }

  async function updateStorage(newValue) {
    const stringifiedValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(KEY, stringifiedValue);
    console.log("Stored %s to %s", stringifiedValue, KEY)
  }

  useEffect(() => {
    pullFromStorage();
  }, []);

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else {
      updateStorage(initialState.available)
    }
  }, [JSON.stringify(initialState.available)])

  return (
    <CardDeckContext.Provider value={[initialState, setState]}>
      {props.children}
    </CardDeckContext.Provider>
  );
}

const useCardDeck = () => {
  const [state, setState] = useContext(CardDeckContext);

  const setSide = (side) => {
    setState(state => ({ ...state, side }));
  }

  const setCurrentCard = (card) => {
    setState(state => ({ ...state, currentCard: card}));
  }

  const flipCard = () => {
    if(state.side === 'front')
      setSide('back')
    else
      setSide('front')
  }

  const randomId = (type) => {
    const index = Math.floor((Math.random() * state.available[type].size))
    return [...state.available[type]][index]
  }

  const nextId = (type) => {
    const last = getLast(type)
    const available = state.available[type]
    if (last) {
      const lastId = last.id
      const lastAvailableId = available[available.length -1]
      if (lastAvailableId === lastId) {
        // wraparound
        return available[0]
      } else {
        return available.find(e => e > last.id)
      }
    } else {
      // very first card default to first available card
      const nextId = available[0]
      return nextId
    }
  }

  const addHistory = (card) => {
    const history = state.history
    history.push(card)
    setState(state => ({ ...state, history }));
  }

  const getLast = (type) => {
    if (type) {
      return state.history.reverse().find(c => c['type'] === type)
    } else {
      return state.history[state.history.length -1]
    }
  }

  const drawCard = (type) => {
    const newCardId = nextId(type)
    const newCard = state.cards.find(c => (c.id === newCardId) && c['type'] === type)
    setCurrentCard(newCard)
    addHistory(newCard)
    setSide(defaultSide)
  }

  const putBack = () => {
    setCurrentCard(null)
    setSide(defaultSide)
  }

  const destroy = (card) => {
    toggleAvailable({label: card.id.toString(), checked: false}, card[type])
    setCurrentCard(null)
    setSide(defaultSide)
  }

  const toggleAvailable = (item, type) => {
    if (item.checked) {
      const newState = state.available
      const idToAdd = parseInt(item.label)
      const newTypeState = state.available[type].concat(idToAdd).sort((a, b) => a - b)
      newState[type] = newTypeState
      setState(state => ({ ...state, available: newState }));
    } else {
      const idToRemove = parseInt(item.label)
      const newTypeState = state.available[type].filter(i => i !== idToRemove).sort((a, b) => a - b)
      state.available[type] = newTypeState
      setState(state => ({ ...state, available: state.available }));
    }
  }

  const reset = () => {
      setState(state => ({ ...state, available: AllCardsAvailable }));
  }

  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const newParty = (name) => {
    const newParty = {
      id: uuidv4(),
      name: name,
    }
    addParty(newParty)
  }

  const addParty = (party) => {
    console.log("ADD PARTY1", state.parties)
    state.parties.push(party)
    console.log("ADD PARTY", state.parties)
    setState(state => ({ ...state, parties: state.parties}))
  }

  const removeParty = (id) => {
    setState(state => ({ ...state, parties: state.parties.filter(p => p.id !== id)}))
  }

  const renameParty = (id, newName) => {
    const party = state.parties.filter(p => p.id !== id)
    party.name == newName
    removeParty(party.id)
    addParty(party)
  }

  return {
    cards: state.cards,
    currentCard: state.currentCard,
    side: state.side,
    available: state.available,
    drawCard,
    flipCard,
    putBack,
    destroy,
    toggleAvailable,
    reset,
    newParty,
    renameParty,
    removeParty,
    parties: state.parties
  }
};

export { CardDeckContext, CardDeckProvider, useCardDeck, allCityCardNumbers, allRoadCardNumbers };
