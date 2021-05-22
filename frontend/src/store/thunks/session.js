
import { setUser, removeUser, setErrors, userSearch  } from '../actions/session.js';
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
  return {};
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

  dispatch(resetErrors());
  dispatch(removeUser());
};






export {
  authenticate,
  login,
  logout,
  signUp,
  resetUser,
  thunk_userSearch,
  thunk_deleteUserAccount,



}
