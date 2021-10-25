


import { SET_GLOBAL_FUNCTIONS } from "../types";






const globalReducer = (state={ setters: null }, action) => {
  switch (action.type) {
    case SET_GLOBAL_FUNCTIONS:
      return { ...state, setters: { ...action.setterFunc } };
    default:
      return state;
  }
};







export {
  globalReducer,

};
