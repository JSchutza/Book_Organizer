
import {
  setUser,
  removeUser,
  userSearch,
  updateUser
} from '../actions/session.js';


import { setErrors, resetErrors } from "../actions/errors.js";


// thunks
const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(setUser(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};



const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(setUser(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};


const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", { headers: { "Content-Type": "application/json", }, });

  if(response.ok) {
    dispatch(resetErrors());
    dispatch(removeUser());
    return true;
  }

};



const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(setUser(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};





// userSearch
//  /api/users/search/:searchId
const thunk_userSearch = (searchId) => async (dispatch) => {
  const response = await fetch(`/api/users/search/${searchId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(userSearch(data));
    return true;
  }

  dispatch(setErrors(data.errors));

};




// /api/users/:userId
const thunk_deleteUserAccount = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(removeUser());
    return true;
  }

  dispatch(setErrors(data.errors));

};



// PUT /api/users/:userId
const thunk_updateUser = ({ userId, name, email, password, bio, location, avatar, birthdate }) => async dispatch => {
  const formData = new FormData();
  formData.append("new_name", name);
  formData.append("new_email", email);
  formData.append("new_password", password);
  formData.append("new_bio", bio);
  formData.append("new_location", location);
  formData.append("new_avatar", avatar);
  formData.append("new_birthdate", birthdate);


  const response = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();
  if (!data.errors) {
    dispatch(resetErrors());
    dispatch(updateUser(data));
    return true;
  }

  dispatch(setErrors(data.errors));

}



export {
  authenticate,
  login,
  logout,
  signUp,
  thunk_userSearch,
  thunk_deleteUserAccount,
  thunk_updateUser

}
