


import { SHOW_MODAL, HIDE_MODAL, CONTENT_MODAL } from "../types";







const modalReducer = (state = { display: false, the_content: null }, action) => {
  switch (action.type){
    case SHOW_MODAL:
      return { ...state, display: true };
    case HIDE_MODAL:
      return { ...state, display: false };
    case CONTENT_MODAL:
      return { ...state, the_content: action.the_content };
    default:
      return state;
  }
}




export {
  modalReducer
}
