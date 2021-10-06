

import { SET_ERRORS, RESET_ERRORS } from "../types";




const setErrors = (errors) => ({
  type: SET_ERRORS,
  errors
});



const resetErrors = () => ({
  type: RESET_ERRORS
});





export {
  setErrors,
  resetErrors
}
