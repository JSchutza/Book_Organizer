
import { SET_USER, REMOVE_USER, VALIDATION_ERRORS, CLEAR_ERRORS } from '../types'


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


export {
  setUser,
  removeUser,
  setErrors,
  clearErrors,


}
