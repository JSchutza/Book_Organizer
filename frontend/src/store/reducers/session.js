
import { SET_USER, REMOVE_USER, VALIDATION_ERRORS, CLEAR_ERRORS } from '../types'




// reducers
const usersReducer = (state = { user: null, errors: null }, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.user };
    case REMOVE_USER:
      return { user: null, errors: null };
    case VALIDATION_ERRORS:
      return { user: null, errors: action.errors };
    case CLEAR_ERRORS:
      return { user: null, errors: null };
    default:
      return state;
  }
}






export {
  usersReducer,

}
