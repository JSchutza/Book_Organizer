
import {
  setUser,
  removeUser,
  setErrors,
  userSearch,
  updateUser
} from '../actions/session.js';

import { setErrors as initErrors, resetErrors } from "../actions/errors.js";


// thunks
const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(setUser(data));
};



const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(setUser(data));

};


const logout = () => async (dispatch) => {
  await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(removeUser());
};



const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }
  dispatch(setUser(data));
};



const resetUser = () => async (dispatch) => {
  const response = await fetch(`/api/users/reset`, { credentials: "include" });
  const data = await response.json();

  dispatch(setUser(data));
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
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }

  dispatch(userSearch(data));

};




// /api/users/:userId
const thunk_deleteUserAccount = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();
  if (data.errors) {
    dispatch(initErrors(data.errors));
    return;
  }

  dispatch(removeUser());

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
  if (data.errors) {
    dispatch(setErrors(data.errors));
    return;
  }

  dispatch(updateUser(data));

}



export {
  authenticate,
  login,
  logout,
  signUp,
  resetUser,
  thunk_userSearch,
  thunk_deleteUserAccount,
  thunk_updateUser

}
