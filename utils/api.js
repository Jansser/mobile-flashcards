import { AsyncStorage } from 'react-native';
export const FLASH_STORAGE_KEY = 'MobileFlashCards:decks';

export const fetchDecks = () => {
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


export const submitDeck = (deck) => {
  return AsyncStorage.mergeItem(FLASH_STORAGE_KEY, JSON.stringify(deck));
}