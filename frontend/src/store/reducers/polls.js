


import { GET_USERS_POLLS, GET_COMMENTS_BY_POLL_ID, DELETE_SPECIFIC_POLL } from "../types";





const pollsReducer = (state = { polls: null }, action) => {
  switch (action.type){
    case GET_USERS_POLLS:
      return { ...action.polls };
    case DELETE_SPECIFIC_POLL:
      const id = action.poll
      delete state[id];
      return { ...state };
    default:
      return state;
  }
};


const commentReducer = (state = { comments: null }, action) => {
  switch (action.type){
    case GET_COMMENTS_BY_POLL_ID:
      return { ...action.comments };
    default:
      return state;
  }
};




export {
  pollsReducer,
  commentReducer,

}
