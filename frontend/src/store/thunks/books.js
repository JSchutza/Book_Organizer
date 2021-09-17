

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



const thunk_createPriChar = ({ bookId, urlpreview, charname, charlabel }) => async (dispatch) => {

  const formData = new FormData();
  formData.append("image", urlpreview);
  formData.append("charactername", charname);
  formData.append("characterlabel", charlabel);

  const response = await fetch(`/api/book/${bookId}/character`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    dispatch(hideModal());
    return;
  }
  dispatch(thunk_getAllPriChars(bookId));
  dispatch(resetErrors());
  dispatch(hideModal());

}





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
  dispatch(thunk_getAllPriChars(bookId));

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



const thunk_updatePriChar = ({ urlpreview, charname, charlabel, bookId, charId }) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", urlpreview);
  formData.append("charactername", charname);
  formData.append("characterlabel", charlabel);

  const response = await fetch(`/api/book/${bookId}/character/${charId}`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    dispatch(hideModal());
    return;
  }

  dispatch(thunk_getAllPriChars(bookId));
  dispatch(resetErrors());
}



const thunk_createPage = ({ title, text, bookId }) => async (dispatch) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);


  const response = await fetch(`/api/book/${bookId}/page`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    dispatch(hideModal());
    return;
  }

  dispatch(thunk_getAllPages(bookId));
  dispatch(resetErrors());
}






const thunk_updatePage = ({ title, text, bookId, pageId }) => async (dispatch) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);

  const response = await fetch(`/api/book/${bookId}/page/${pageId}`, {
    method: "PUT",
    body: formData,
  });


  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    dispatch(hideModal());
    return;
  }

  dispatch(thunk_getAllPages(bookId));
  dispatch(resetErrors());
}








export {
  thunk_getAllBooks,
  thunk_getAllPriChars,
  thunk_getAllPages,
  thunk_deleteBook,
  thunk_deleteUsersPrivateChars,
  thunk_deletePage,
  thunk_createPriChar,
  thunk_updatePriChar,
  thunk_createPage,
  thunk_updatePage,


}
