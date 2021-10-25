

import { SET_GLOBAL_FUNCTIONS } from "../types";




const setSetters = (setterFunc) => ({
  type: SET_GLOBAL_FUNCTIONS,
  setterFunc
});




export {
  setSetters,

};
