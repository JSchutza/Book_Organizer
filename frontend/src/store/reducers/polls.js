


import { GET_USERS_POLLS } from "../types";





const pollsReducer = (state = { polls: null }, action) => {
  switch (action.type){
    case GET_USERS_POLLS:
      return { ...action.polls };
    default:
      return state;
  }
};






export {
  pollsReducer,

}
