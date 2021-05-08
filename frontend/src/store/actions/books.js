

import { GET_USERS_BOOKS, GET_USERS_PRI_CHARS, GET_USERS_PAGES, DELETE_BOOK, DELETE_USERS_PRI_CHARS } from '../types'



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



export {
  getAllBooks,
  getAllPriChars,
  getAllPages,
  deleteBook,
  deleteUsersPrivateChars,



}
