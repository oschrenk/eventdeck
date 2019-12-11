import React, { useContext, useState } from "react";

import defaultData from '../data/events.json'

const CardDeckContext = React.createContext([{}, () => {}]);

const CardDeckProvider = (props) => {
  const [initialState, setState] = useState({
    side: 'front',
    currentCard: null,
    cards: defaultData
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
    console.log("flip", state.side)
    if(state.side === 'front')
      setSide('back')
    else
      setSide('front')
  }

  const drawCard = () => {
    const newCardId = Math.floor((Math.random() * state.cards.length) + 1);
    const newCard = state.cards.find(c => c.id === newCardId)
    setCard(newCard)
    setSide('front')
  }

  const putBack = () => {
    setCard(null)
    setSide('front')
  }
  return {
    cards: state.cards,
    currentCard: state.currentCard,
    side: state.side,
    drawCard,
    flipCard,
    putBack
  }
};

export { CardDeckContext, CardDeckProvider, useCardDeck };
