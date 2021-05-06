

import { GET_USERS_BOOKS, GET_USERS_PRI_CHARS, GET_USERS_PAGES } from '../types'



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
})


export {
  getAllBooks,
  getAllPriChars,
  getAllPages,



}
