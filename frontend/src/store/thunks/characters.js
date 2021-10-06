

import {
  getAllCharacters,
  searchForUsersPubChars,
  deleteUsersPubChars,
  updatePubChar,
  createPubChar
} from "../actions/characters.js";


import { deleteSearchPubChar } from "../actions/characters.js";
import { setErrors, resetErrors  } from "../actions/errors.js";





// thunks
const thunk_getAllCharacters = () => async (dispatch) => {
  const response = await fetch("/api/characters/all", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(getAllCharacters(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};





// /api/users/:searchId
const thunk_searchForUsersPubChars = (searchId) => async (dispatch) => {
  const response = await fetch(`/api/users/${searchId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(searchForUsersPubChars(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};




// /api/characters/:characterId
const thunk_deleteUsersPubChars = (characterId, inSearch=false) => async (dispatch) => {
  const response = await fetch(`/api/characters/${characterId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    if (inSearch) {
      // if the thunk was dispatched in the search results component
      dispatch(deleteUsersPubChars(characterId));
      dispatch(deleteSearchPubChar(characterId));
      return true;
    }

    // if the thunk was NOT dispatched in the search results component
    dispatch(deleteUsersPubChars(characterId));
    return true;
  }

  dispatch(setErrors(data.errors));

};






//  /api/characters
const thunk_newPubCharacter = ({ urlpreview, charname, charlabel }) => async (dispatch) => {

  const formData = new FormData();
  formData.append("image", urlpreview);
  formData.append("charactername", charname);
  formData.append("characterlabel", charlabel);

  const response = await fetch("/api/characters", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if(!data.errors) {
    dispatch(resetErrors());
    dispatch(createPubChar(data));
    return true;
  }

  dispatch(setErrors(data.errors));

}


// /api/characters/:charId
const thunk_updatePubCharacter = ({ urlpreview, charname, charlabel, charId }) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", urlpreview);
  formData.append("charactername", charname);
  formData.append("characterlabel", charlabel);


  const response = await fetch(`/api/characters/${charId}`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(updatePubChar(data));
    return true;
  }

  dispatch(setErrors(data.errors));

}






export {
  thunk_getAllCharacters,
  thunk_searchForUsersPubChars,
  thunk_deleteUsersPubChars,
  thunk_newPubCharacter,
  thunk_updatePubCharacter,

}
