import React, { useContext, useState, useEffect, useRef } from "react";
import AsyncStorage from '@react-native-community/async-storage'

import allCityEvents from '../data/city.json'
import allRoadEvents from '../data/road.json'

const CardDeckContext = React.createContext([{}, () => {}]);

const allCityCardNumbers = allCityEvents.map(e => e.id)
const allRoadCardNumbers = allRoadEvents.map(e => e.id)
const cards = allCityEvents.concat(allRoadEvents)

const KEY = '@dev.oschrenk.eventdeck/v1e'
const defaultSide = 'back'

const AllEventsAvailable = {
  city: allCityCardNumbers,
  road: allRoadCardNumbers
}

const InitialState = {
  ui: {
    currentParty: "default",
    currentCard: null,
    side: defaultSide,
  },
  parties: [
    {
      id: "default",
      name: "The Boyz",
      events: AllEventsAvailable,
      history:[]
    }
  ]
}

const CardDeckProvider = (props) => {
  const [state, setState] = useState(InitialState);

  async function pullFromStorage() {
    const fromStorage = await AsyncStorage.getItem(KEY)
    let value = {}
    if (fromStorage) {
      value = JSON.parse(fromStorage)
      console.log("Loaded %s from %s", fromStorage, KEY)
    }

    setState(state => ({ ...state, ...value }));
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
      updateStorage(state)
    }
  }, [JSON.stringify(state)])

  return (
    <CardDeckContext.Provider value={[state, setState]}>
      {props.children}
    </CardDeckContext.Provider>
  );
}

const useCardDeck = () => {
  const [state, setState] = useContext(CardDeckContext);

  const setSide = (side) => {
    const ui = state.ui
    ui.side = side
    setState(state => ({ ...state, ui}));
  }

  const setCurrentCard = (card) => {
    const ui = state.ui
    ui.currentCard = card
    setState(state => ({ ...state, ui}));
  }

  const flipCard = () => {
    if(state.ui.side === 'front')
      setSide('back')
    else
      setSide('front')
  }

  const randomId = (type) => {
    const partyId = state.ui.currentParty
    const party = state.parties.filter(p => p.id === partyId)[0]
    const available = party.events[type]

    const index = Math.floor((Math.random() * available.size))
    return available[index]
  }

  const nextId = (type) => {
    const last = getLast(type)

    const partyId = state.ui.currentParty
    const party = state.parties.filter(p => p.id === partyId)[0]
    const available = party.events[type]

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
    const party = currentParty()
    const history = party.history
    const minCard = {id: card.id, type: card['type']}
    history.push(minCard)
    party.history = history

    const newParties = state.parties.filter(p => p.id !== party.id).concat(party)

    setState(state => ({ ...state, parties: newParties }));
  }

  const getLast = (type) => {
    const party = currentParty()
    const history = party.history
    if (type) {
      return history.reverse().find(c => c['type'] === type)
    } else {
      return history[state.history.length -1]
    }
  }

  const drawCard = (type) => {
    const newCardId = nextId(type)
    const newCard = cards.find(c => (c.id === newCardId) && c['type'] === type)
    setCurrentCard(newCard)
    addHistory(newCard)
    setSide(defaultSide)
  }

  const putBack = () => {
    setCurrentCard(null)
    setSide(defaultSide)
  }

  const destroy = () => {
    toggleAvailable({label: state.ui.currentCard.id.toString(), checked: false}, state.ui.currentCard['type'])
    setCurrentCard(null)
    setSide(defaultSide)
  }

  const isAvailable = (id, type) => {
    const partyId = state.ui.currentParty
    const party = state.parties.filter(p => p.id === partyId)[0]
    const events = party.events[type]
    return events.includes(id)
  }

  const toggleAvailable = (item, type) => {
    const partyId = state.ui.currentParty
    const party = state.parties.filter(p => p.id === partyId)[0]
    const newEvents = party.events

    var newTypeEvents = []
    if (item.checked) {
      const idToAdd = parseInt(item.label)
      newTypeEvents = newEvents[type].concat(idToAdd).sort((a, b) => a - b)
    } else {
      const idToRemove = parseInt(item.label)
      newTypeEvents = newEvents[type].filter(i => i !== idToRemove).sort((a, b) => a - b)
    }

    newEvents[type] = newTypeEvents
    party.events = newEvents

    const newParties = state.parties.filter(p => p.id !== partyId).concat(party)

    setState(state => ({ ...state, parties: newParties }));
  }

  const reset = () => {

    const partyId = state.ui.currentParty
    const party = state.parties.filter(p => p.id === partyId)[0]
    party.events = AllEventsAvailable
    const newParties = state.parties.filter(p => p.id !== id).concat(party)
    setState(state => ({ ...state, parties: newParties }));
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
      events: AllEventsAvailable
    }
    addParty(newParty)
  }

  const addParty = (party) => {
    state.parties.push(party)
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

  const makeCurrent = (id) => {
    const ui = state.ui
    ui.currentParty = id
    setState(state => ({ ...state, ui}))
  }

  const isCurrent = (id) => {
    return state.ui.currentParty === id
  }

  const currentParty = () => {
    const id = state.ui.currentParty
    const party = state.parties.find(p => p.id === id)
    return party
  }


  const isDefault = (id) => {
    return id === 'default'
  }

  return {
    currentCard: state.ui.currentCard,
    side: state.ui.side,

    drawCard,
    flipCard,
    putBack,
    destroy,
    reset,

    isAvailable,
    toggleAvailable,

    parties: state.parties,
    newParty,
    renameParty,
    removeParty,
    makeCurrent,
    currentParty,
    isCurrent,
    isDefault,
  }
};

export { CardDeckContext, CardDeckProvider, useCardDeck, allCityCardNumbers, allRoadCardNumbers };
