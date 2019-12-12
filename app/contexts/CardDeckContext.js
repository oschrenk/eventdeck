import React, { useContext, useState } from "react";

import defaultData from '../data/events.json'

const CardDeckContext = React.createContext([{}, () => {}]);

const allCardNumbers = defaultData.map(e => e.id)

const CardDeckProvider = (props) => {
  const [initialState, setState] = useState({
    side: 'front',
    currentCard: null,
    cards: defaultData,
    available: new Set(allCardNumbers)
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

  const pickAvailable = () => {
    return Math.floor((Math.random() * state.available.size) + 1);
  }

  const drawCard = () => {
    const newCardId = pickAvailable()
    const newCard = state.cards.find(c => c.id === newCardId)
    setCard(newCard)
    setSide('front')
  }

  const putBack = () => {
    setCard(null)
    setSide('front')
  }

  const destroy = (id) => {
    toggleAvailable({label: id.toString(), checked: false})
    setCard(null)
    setSide('front')
  }

  const toggleAvailable = (item) => {
    if (item.checked) {
      state.available.add(parseInt(item.label))
      setState(state => ({ ...state, available: state.available }));
    } else {
      state.available.delete(parseInt(item.label))
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

export { CardDeckContext, CardDeckProvider, useCardDeck, allCardNumbers };
