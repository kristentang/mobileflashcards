import { getDecks } from '../utils/api'

export const RECEIVE_ALL_DECKS = 'RECEIVE_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_ALL_DECKS,
    decks
  }
}

export function addEntry (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function handleInitialData() {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(receiveDecks(decks));
    });
  };
}
