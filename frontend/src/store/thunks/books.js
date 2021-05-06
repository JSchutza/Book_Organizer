

import { getAllBooks, getAllPriChars } from "../actions/books.js";





// thunks
const thunk_getAllBooks = () => async (dispatch) => {
  const response = await fetch("/api/books", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(getAllBooks(data));
};





// const thunk_deleteUsersPubChars = (characterId) => async (dispatch) => {
//   const response = await fetch(`/api/characters/${characterId}`, {
//     method: "DELETE",
//     credentials: "include",
//   });

//   const data = await response.json();
//   if (data.errors) {
//     return;
//   }
//   dispatch(deleteUsersPubChars(characterId));
// };



const thunk_getAllPriChars = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/book/${bookId}/characters`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(getAllPriChars(data));
};




export {
  thunk_getAllBooks,
  thunk_getAllPriChars,


}
