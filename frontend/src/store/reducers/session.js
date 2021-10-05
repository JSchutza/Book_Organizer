
import {
  SET_USER,
  REMOVE_USER,
  USER_SEARCH,
  UPDATE_USER

} from '../types'




// reducers
const usersReducer = (state = { user: null, searchedUser: null }, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.user, searchedUser: null };

    case REMOVE_USER:
      return { user: null, errors: null };

    case USER_SEARCH:
      return { ...state, searchedUser: action.searchedUser };

    case UPDATE_USER:
      return { user: action.user.user, searchedUser: null };

    default:
      return state;
  }
}






export {
  usersReducer,

}
