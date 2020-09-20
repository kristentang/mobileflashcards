import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UdaciFlashcards:deck'


export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (decks) => { return JSON.parse(decks) })
  .catch(err => console.log(err))
}

export function saveDeckTitle(title) {
  return (
    getDecks()
      .then((decks) => { // JUST EDITED HERE
        var id = 0
        if (decks!== undefined && decks!== null) {
          id = Object.keys(decks).length
        }
        var emptyDeck = { id, title, questions: [] };
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
          [id]: emptyDeck
        }))
        .catch(err => console.log("Error Saving Deck Title: ", err))
      })
  )
}

export function addCardToDeck(id, title, card) {
  return (
    getDecks()
      .then((decks) => {
        decks[id].questions.push(card);
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks))
        .catch(err => console.log("Error Saving Card: ", err))
      })
  )
}

export function deleteAllDecks () {
    return AsyncStorage.clear()
}
