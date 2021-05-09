


import { SHOW_LOADER, HIDE_LOADER } from "../types";





const loaderReducer = (state = { display: false }, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, display: true };
    case HIDE_LOADER:
      return { ...state, display: false };
    default:
      return state;
  }
}




export {
  loaderReducer
}
