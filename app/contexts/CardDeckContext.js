import React, { useContext, useState } from "react";

import allCityEvents from '../data/city.json'
import allRoadEvents from '../data/road.json'

const CardDeckContext = React.createContext([{}, () => {}]);

const allCityCardNumbers = allCityEvents.map(e => e.id)
const allRoadCardNumbers = allRoadEvents.map(e => e.id)

const defaultSide = 'front'

const CardDeckProvider = (props) => {
  const [initialState, setState] = useState({
    side: defaultSide,
    history: [],
    currentCard: null,
    cards: allCityEvents.concat(allRoadEvents),
    available: {
      city: allCityCardNumbers,
      road: allRoadCardNumbers
    }
  });

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
      const idToAdd = parseInt(item.label)
      const newTypeState = state.available[type].concat(idToAdd).sort((a, b) => a - b)
      state.available[type] = newTypeState
      setState(state => ({ ...state, available: state.available }));
    } else {
      const idToRemove = parseInt(item.label)
      const newTypeState = state.available[type].filter(i => i !== idToRemove).sort((a, b) => a - b)
      state.available[type] = newTypeState
      setState(state => ({ ...state, available: state.available }));
    }
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
    toggleAvailable
  }
};

export { CardDeckContext, CardDeckProvider, useCardDeck, allCityCardNumbers, allRoadCardNumbers };
