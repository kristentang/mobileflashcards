import { RECEIVE_ALL_DECKS, ADD_DECK } from '../actions'

function deckEntries(state=null, action) {
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
    default:
      return state
  }
}

export default deckEntries
