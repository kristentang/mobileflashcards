import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UdaciFlashcards:deck'


export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (decks) =>
    {
      return JSON.parse(decks)
    }
  )
  .catch(err => console.log(err))
}

// export function submitEntry ({ entry, key }) {
//   console.log("HERE")
//   return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// save new deck
export function saveDeckTitle(title) {
  const emptyDeck = { title, questions: [] };
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: emptyDeck
  }))
  .catch(err => console.log("Error Saving Deck Title: ", err))
}

export function deleteAllDecks () {
    return AsyncStorage.clear()
}
