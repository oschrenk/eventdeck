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
    currentCard: null,
    cards: allCityEvents.concat(allRoadEvents),
    available: {
      city: new Set(allCityCardNumbers),
      road: new Set(allRoadCardNumbers)
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

  const setCard = (card) => {
    setState(state => ({ ...state, currentCard: card}));
  }

  const flipCard = () => {
    if(state.side === 'front')
      setSide('back')
    else
      setSide('front')
  }

  const pickAvailable = (type) => {
    const index = Math.floor((Math.random() * state.available[type].size))
    return [...state.available[type]][index]
  }

  const drawCard = (type) => {
    const newCardId = pickAvailable(type)
    const newCard = state.cards.find(c => (c.id === newCardId) && c['type'] === type)
    setCard(newCard)
    setSide(defaultSide)
  }

  const putBack = () => {
    setCard(null)
    setSide(defaultSide)
  }

  const destroy = (card) => {
    toggleAvailable({label: card.id.toString(), checked: false}, card[type])
    setCard(null)
    setSide(defaultSide)
  }

  const toggleAvailable = (item, type) => {
    console.log("item", item)
    console.log("type", type)
    if (item.checked) {
      state.available[type].add(parseInt(item.label))
      setState(state => ({ ...state, available: state.available }));
    } else {
      state.available[type].delete(parseInt(item.label))
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
