



import { NEXT_CARD, RESET_CARDS, GET_SINGLE_CARD } from '../types'



// reducers
const cardLoaderReducer = (state = { cards: null }, action) => {
  switch (action.type) {
    case NEXT_CARD:
      return { cards: action.cards, cardId: action.cardId };
    case RESET_CARDS:
      return { cards: null };
    default:
      return state;
  }
}


const singleCardReducer = (state = { card: null}, action) => {
  switch (action.type) {
    case GET_SINGLE_CARD:
      return { card: action.card }
    default:
      return state;
  }
}



export {
  cardLoaderReducer,
  singleCardReducer,

}
