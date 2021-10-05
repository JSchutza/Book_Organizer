
import {
  SET_USER,
  REMOVE_USER,
  USER_SEARCH,
  UPDATE_USER

} from '../types'



const updateUser = (user) => ({
  type: UPDATE_USER,
  user
});



const setUser = (user) => ({
  type: SET_USER,
  user,
});



const removeUser = () => ({
  type: REMOVE_USER,
});



const userSearch = (searchedUser) => ({
  type: USER_SEARCH,
  searchedUser
});







export {
  setUser,
  removeUser,
  userSearch,
  updateUser,


}
