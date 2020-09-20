export const RECEIVE_ALL_DECKS = 'RECEIVE_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_ALL_DECKS,
    decks
  }
}

export function addDeckEntry (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCardEntry (id, deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  }
}
