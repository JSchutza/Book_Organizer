
import { SET_USER, REMOVE_USER } from '../types'




// reducers
const usersReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.user };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}






export {
  usersReducer,

}
