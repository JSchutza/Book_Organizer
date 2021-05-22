
import { SET_USER, REMOVE_USER, VALIDATION_ERRORS, CLEAR_ERRORS, USER_SEARCH } from '../types'


const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});


const setErrors = (errors) => ({
  type: VALIDATION_ERRORS,
  errors
});



const clearErrors = () => ({
  type: CLEAR_ERRORS
});


const userSearch = (searchedUser) => ({
  type: USER_SEARCH,
  searchedUser
});







export {
  setUser,
  removeUser,
  setErrors,
  clearErrors,
  userSearch,


}
