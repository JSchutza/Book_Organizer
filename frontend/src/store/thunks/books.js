

import { getAllBooks, getAllPriChars, getAllPages, deleteBook, deleteUsersPrivateChars, deletePage } from "../actions/books.js";
import { setErrors, resetErrors } from "../actions/errors.js";




// thunks
const thunk_getAllBooks = () => async (dispatch) => {
  const response = await fetch("/api/books", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(getAllBooks(data));
};






const thunk_getAllPriChars = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/book/${bookId}/characters`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(getAllPriChars(data));
};







const thunk_getAllPages = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/book/${bookId}/pages`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(getAllPages(data));
};




// /api/books/:bookId
const thunk_deleteBook = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/books/${bookId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(deleteBook(bookId));

};





//  /api/book/:bookId/character/:characterId
const thunk_deleteUsersPrivateChars = (bookId, characterId) => async (dispatch) => {
  const response = await fetch(`/api/book/${bookId}/character/${characterId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(deleteUsersPrivateChars(characterId));

};






//  /api/book/:bookId/page/:pageId
const thunk_deletePage = (bookId, pageId) => async (dispatch) => {
  const response = await fetch(`/api/book/${bookId}/page/${pageId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(deletePage(pageId));

};




export {
  thunk_getAllBooks,
  thunk_getAllPriChars,
  thunk_getAllPages,
  thunk_deleteBook,
  thunk_deleteUsersPrivateChars,
  thunk_deletePage,


}
