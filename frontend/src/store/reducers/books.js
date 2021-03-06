
import {
  GET_USERS_BOOKS,
  GET_USERS_PRI_CHARS,
  GET_USERS_PAGES,
  DELETE_BOOK,
  DELETE_USERS_PRI_CHARS,
  DELETE_USERS_PAGE,
  CREATE_USERS_BOOKS,
  CREATE_PRI_CHAR,
  CREATE_PAGE,
  UPDATE_PRI_CHAR,
  UPDATE_PAGE

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
      return { ...state, characters: { ...state.characters, ...action.character } };

    case DELETE_USERS_PRI_CHARS:
      const id = action.character
      delete state.characters[id];
      return { ...state, characters: { ...state.characters } };

    case UPDATE_PRI_CHAR:
      return { ...state, characters: { ...state.characters, ...action.character } };

    default:
      return state;
  }
}



const pageReducer = (state = { pages: null }, action) => {
  switch (action.type) {
    case GET_USERS_PAGES:
      return { ...state, pages: { ...action.pages.pages } };

    case CREATE_PAGE:
      return { ...state, pages: { ...state.pages, ...action.page } };

    case DELETE_USERS_PAGE:
      const id = action.page;
      delete state.pages[id];
      return { ...state, pages: { ...state.pages } };

    case UPDATE_PAGE:
      return { ...state, pages: { ...state.pages, ...action.page } };

    default:
      return state;
  }
}



export {
  booksReducer,
  priCharReducer,
  pageReducer,

}
