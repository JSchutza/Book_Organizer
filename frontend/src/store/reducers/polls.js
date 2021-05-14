


import { GET_USERS_POLLS, GET_COMMENTS_BY_POLL_ID } from "../types";





const pollsReducer = (state = { polls: null }, action) => {
  switch (action.type){
    case GET_USERS_POLLS:
      return { ...action.polls };
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
