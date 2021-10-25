

import { SET_GLOBAL_FUNCTIONS, CLEAR_GLOBAL_FUNCTIONS } from "../types";




const setSetters = (setterFunc) => ({
  type: SET_GLOBAL_FUNCTIONS,
  setterFunc
});



const clearSetters = () => ({
  type: CLEAR_GLOBAL_FUNCTIONS
});



export {
  setSetters,
  clearSetters,

};
