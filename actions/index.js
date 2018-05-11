export const GET_DECKS = 'GET_DECKS';

export const getDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks
  }
}
