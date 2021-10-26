


import { SET_GLOBAL_FUNCTIONS, CLEAR_GLOBAL_FUNCTIONS } from "../types";






const globalReducer = (state={ setters: null }, action) => {
  switch (action.type) {
    case SET_GLOBAL_FUNCTIONS:
      return { ...state, setters: action.setterFunc  };
    case CLEAR_GLOBAL_FUNCTIONS:
      return { ...state, setters: null };
    default:
      return state;
  }
};







export {
  globalReducer,

};
