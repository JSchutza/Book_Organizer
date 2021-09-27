

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



const updatePage = (page) => ({
  type: UPDATE_PAGE,
  page
});



const updatePriChar = (character) => ({
  type: UPDATE_PRI_CHAR,
  character
});




const createPage = (page) => ({
  type: CREATE_PAGE,
  page
});



const cratePriChar = (character) => ({
  type: CREATE_PRI_CHAR,
  character
});




const createBook = (book) => ({
  type: CREATE_USERS_BOOKS,
  book
});




const getAllBooks = (books) => ({
  type: GET_USERS_BOOKS,
  books
});



const getAllPriChars = (characters) => ({
  type: GET_USERS_PRI_CHARS,
  characters
});



const getAllPages = (pages) => ({
  type: GET_USERS_PAGES,
  pages
});



const deleteBook = (book) => ({
  type: DELETE_BOOK,
  book
});



const deleteUsersPrivateChars = (character) => ({
  type: DELETE_USERS_PRI_CHARS,
  character
});



const deletePage = (page) => ({
  type: DELETE_USERS_PAGE,
  page
});



export {
  getAllBooks,
  getAllPriChars,
  getAllPages,
  deleteBook,
  deleteUsersPrivateChars,
  deletePage,
  createBook,
  cratePriChar,
  createPage,
  updatePriChar,
  updatePage,

}
