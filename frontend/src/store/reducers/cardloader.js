



import { NEXT_CARD } from '../types'



// reducers
const cardLoaderReducer = (state = { cards: null }, action) => {
  switch (action.type) {
    case NEXT_CARD:
      return { cards: action.cards };
    default:
      return state;
  }
}






export {
  cardLoaderReducer,

}
