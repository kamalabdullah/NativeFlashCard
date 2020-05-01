import { AsyncStorage } from 'react-native';

export const decks = {
    Deck1: {
      title: 'Deck1',
      questions: [
        {
          question: 'Q 1',
          answer: 'Answer 1'
        },
        {
          question: 'Q 2',
          answer: 'Answer 2'
        }
      ]
    },
    Deck2: {
      title: 'Deck2',
      questions: [
        {
          question: 'Q1',
          answer:
            'Answer 1'
        }
      ]
    },
    Deck3: {
      title: 'Deck3',
      questions: [
        {
          question: 'Q1',
          answer: 'Answer 1'
        },
        {
          question: 'Q2',
          answer:
            'Answer 2'
        },
        {
          question: 'Q3',
          answer:
            'Answer 3'
        }
      ]
    }
  };

  const DECKS_STORAGE_KEY = 'Flashcards:decks';

export function getData() {
  return decks;
}

export async function getDecks() {
  const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (storeResults === null) {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  }
  return storeResults === null ? decks : JSON.parse(storeResults);
}

export async function addNewDeck(title) {
  await AsyncStorage.mergeItem( DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}

export async function removeDeckAPI(key) {
    const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const decks = JSON.parse(results);
    decks[key] = undefined;
    delete decks[key];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

export async function addQuestionAPI(title, question) {
  const deck = await getDeck(title);
  await AsyncStorage.mergeItem( DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        questions: [...deck.questions].concat(question)
      }
    })
  );
}