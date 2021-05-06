
import { GET_USERS_BOOKS, GET_USERS_PRI_CHARS } from '../types'




// reducers
const booksReducer = (state = { books: null }, action) => {
  switch (action.type) {
    case GET_USERS_BOOKS:
      return { ...action.books };
    default:
      return state;
  }
}


const priCharReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case GET_USERS_PRI_CHARS:
      return { ...action.characters };
    default:
      return state;
  }
}



export {
  booksReducer,
  priCharReducer,

}
