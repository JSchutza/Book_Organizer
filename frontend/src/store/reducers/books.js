
import { GET_USERS_BOOKS } from '../types'




// reducers
const booksReducer = (state = { books: null }, action) => {
  switch (action.type) {
    case GET_USERS_BOOKS:
      return { ...action.books };
    default:
      return state;
  }
}






export {
  booksReducer,

}
