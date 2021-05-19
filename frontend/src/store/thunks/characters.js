

import { getAllCharacters, searchForUsersPubChars, deleteUsersPubChars } from "../actions/characters.js";
import { setErrors, resetErrors  } from "../actions/errors.js";





// thunks
const thunk_getAllCharacters = () => async (dispatch) => {
  const response = await fetch("/api/characters/all", {
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
  dispatch(getAllCharacters(data));
};




const thunk_searchForUsersPubChars = (searchId) => async (dispatch) => {
  const response = await fetch(`/api/users/${searchId}`, {
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
  dispatch(searchForUsersPubChars(data));
};




// /api/characters/:characterId
const thunk_deleteUsersPubChars = (characterId) => async (dispatch) => {
  const response = await fetch(`/api/characters/${characterId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(resetErrors());
  dispatch(deleteUsersPubChars(characterId));
};




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
  if(data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }

  dispatch(thunk_getAllCharacters());
}



const thunk_updatePubCharacter = ({ urlpreview, charname, charlabel, charId, search_id }) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", urlpreview);
  formData.append("charactername", charname);
  formData.append("characterlabel", charlabel);


  const response = await fetch(`/api/characters/${charId}`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }

  dispatch(thunk_searchForUsersPubChars(search_id));

}






export {
  thunk_getAllCharacters,
  thunk_searchForUsersPubChars,
  thunk_deleteUsersPubChars,
  thunk_newPubCharacter,
  thunk_updatePubCharacter,

}
