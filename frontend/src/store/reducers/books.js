
import {
  GET_USERS_BOOKS,
  GET_USERS_PRI_CHARS,
  GET_USERS_PAGES,
  DELETE_BOOK,
  DELETE_USERS_PRI_CHARS,
  DELETE_USERS_PAGE,
  CREATE_USERS_BOOKS,
  CREATE_PRI_CHAR
  } from '../types'




// reducers
const booksReducer = (state = { books: null }, action) => {
  switch (action.type) {
    case GET_USERS_BOOKS:
      return {...state, books: { ...action.books.books } };

    case CREATE_USERS_BOOKS:
      return { ...state, books: { ...state.books, [action.book.id]: action.book } };

    case DELETE_BOOK:
      const id = action.book;
      delete state.books[id];
      return { ...state, books: { ...state.books } };

    default:
      return state;
  }
}



const priCharReducer = (state = { characters: null }, action) => {
  switch (action.type) {
    case GET_USERS_PRI_CHARS:
      return { ...state, characters: { ...action.characters.characters } };

    case CREATE_PRI_CHAR:
      return { ...state, books: { ...state.characters, [action.character.id]: action.character } };

    case DELETE_USERS_PRI_CHARS:
      const id = action.character
      delete state.characters[id];
      return { ...state, characters: { ...state.characters } };

    default:
      return state;
  }
}



const pageReducer = (state = { pages: null }, action) => {
  switch (action.type) {
    case GET_USERS_PAGES:
      return { ...action.pages };
    case DELETE_USERS_PAGE:
      const id = action.page;
      delete state[id];
      return { ...state };
    default:
      return state;
  }
}



export {
  booksReducer,
  priCharReducer,
  pageReducer,

}
