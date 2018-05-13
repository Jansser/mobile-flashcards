export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK  = 'ADD_DECK';

export const getDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks
  }
}

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck
  }
}
