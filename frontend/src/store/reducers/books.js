
import { GET_USERS_BOOKS, GET_USERS_PRI_CHARS, GET_USERS_PAGES, DELETE_BOOK, DELETE_USERS_PRI_CHARS } from '../types'




// reducers
const booksReducer = (state = { books: null }, action) => {
  switch (action.type) {
    case GET_USERS_BOOKS:
      return { ...action.books };
    case DELETE_BOOK:
      const id = action.book;
      delete state[id];
      return { ...state };
    default:
      return state;
  }
}


const priCharReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case GET_USERS_PRI_CHARS:
      return { ...action.characters };
    case DELETE_USERS_PRI_CHARS:
      const id = action.character
      delete state[id];
      return { ...state };
    default:
      return state;
  }
}

const pageReducer = (state = { pages: null }, action) => {
  switch (action.type) {
    case GET_USERS_PAGES:
      return { ...action.pages };
    default:
      return state;
  }
}



export {
  booksReducer,
  priCharReducer,
  pageReducer,

}
