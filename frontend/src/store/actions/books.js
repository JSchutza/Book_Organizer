

import { GET_USERS_BOOKS, GET_USERS_PRI_CHARS } from '../types'



const getAllBooks = (books) => ({
  type: GET_USERS_BOOKS,
  books
});



const getAllPriChars = (characters) => ({
  type: GET_USERS_PRI_CHARS,
  characters
});




export {
  getAllBooks,
  getAllPriChars,



}
