


import { SHOW_MODAL, HIDE_MODAL } from "../types";







const modalReducer = (state = { display: false }, action) => {
  switch (action.type){
    case SHOW_MODAL:
      return { ...state, display: true };
    case HIDE_MODAL:
      return { ...state, display: false };
    default:
      return state;
  }
}




export {
  modalReducer
}
