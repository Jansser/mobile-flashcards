import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions';

const decks = (state = {}, action) => {
  if(action.type === ADD_CARD) {
    //console.log('State', state);
    //console.log('Title', action.title);
    //console.log('Card', action.card);
  }

  switch(action.type) {
    case GET_DECKS:
      return {
       ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      let deck = state[action.title];
      deck.questions.push(action.card);
      state[action.title] = deck;

      return {
        ...state
      }
    default:
      return state
  }
}

export default decks;
