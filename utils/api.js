import { AsyncStorage } from 'react-native';
export const FLASH_STORAGE_KEY = 'MobileFlashCards:decks';


//AsyncStorage.clear();

export const fetchDecks = () => {
  AsyncStorage.setItem(FLASH_STORAGE_KEY, null);

  return AsyncStorage.getItem(FLASH_STORAGE_KEY).then(
    (results) => {
      if(results === null) {
        let initialData = {
          React: {
            title: 'React',
            questions: [
              {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
              },
              {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
              }
            ]
          },
          JavaScript: {
            title: 'JavaScript',
            questions: [
              {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
              }
            ]
          }
        };
        
        AsyncStorage.setItem(FLASH_STORAGE_KEY, JSON.stringify(initialData));

        return initialData;
      } else {
        return JSON.parse(results);
      }
    }
  );
}

export const submitDeck = deck => {
  return AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(deck));
}

export const getDeck = (id) => {
  return AsyncStorage.getItem(FLASH_STORAGE_KEY).then(results => {
    return JSON.parse(results)[id];
  });
}

export const addCardToDeck = (title, card) => {
  getDeck(title).then(deck => {
    deck.questions.push(card);
    
    deck = {
      [title] : deck
    };

    submitDeck(deck);
  });
}


/* 
  getDecks
  getDeck
  saveDeckTitle
  addCardToDeck
*/