import { RECEIVE_ALL_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function deckReducer(state=null, action) {
  switch (action.type) {
    case RECEIVE_ALL_DECKS:
      return {
        ...state,
        ...action.decks // merge action.entries onto state
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck // merge action.entry onto state
      }
    case ADD_CARD:
      const updatedDeck = state[action.deck.id];
      updatedDeck.questions.push(action.card);
      return {
        ...state,
        [action.deck.id]: updatedDeck
      }
    default:
      return state
  }
}

export default deckReducer
