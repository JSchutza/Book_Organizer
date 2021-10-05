


import { SET_ERRORS, RESET_ERRORS } from "../types";









const errorsReducer = (state = { errors: null }, action) => {
  switch (action.type) {
    case SET_ERRORS:
      if (Array.isArray(action.errors)){
        return { errors: { ...action.errors } };
      }

      return { errors: null };

    case RESET_ERRORS:
      return { errors: null };

    default:
      return state;
  }
}




export {
  errorsReducer

}
